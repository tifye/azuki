import { Assert } from '@/lib/assert'
import { ComponentDefinition, Placement, TextSource } from './definition'
import { View, Text, FlexAlignType } from 'react-native'
import { useThemeColor } from '../Themed'
import { TextSourceComponent, useTextSource } from './hooks/useTextSource'

type StatDefinition = ComponentDefinition & {
    title?: TextSource
    description?: TextSource
    value: TextSource
    place: Placement
}
function StatComponent(def: StatDefinition) {
    Assert(def.type === 'stat', "expected type 'stat'")
    Assert(
        def.value !== undefined,
        "expected property 'value' in StatComponent",
    )
    const title = useTextSource(def.title)
    const description = useTextSource(def.description)
    const valueColor = useThemeColor({}, 'accent')
    const otherColor = useThemeColor({}, 'baseContent')

    let align: FlexAlignType
    switch (def.place) {
        case 'start':
            align = 'flex-start'
            break
        case 'center':
            align = 'center'
            break
        case 'end':
            align = 'flex-end'
            break
        default:
            align = 'flex-start'
            break
    }

    let textAlign: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined
    switch (def.place) {
        case 'start':
            textAlign = 'left'
            break
        case 'center':
            textAlign = 'center'
            break
        case 'end':
            textAlign = 'right'
            break
        default:
            textAlign = 'left'
            break
    }
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: align,
                gap: 6,
            }}
        >
            {title && (
                <Text style={{ color: otherColor, textAlign }}>
                    <TextSourceComponent source={def.title} />
                </Text>
            )}
            <Text
                style={{
                    color: valueColor,
                    fontSize: 36,
                    fontWeight: 800,
                }}
            >
                <TextSourceComponent source={def.value} />
            </Text>
            {description && description !== '' && (
                <Text style={{ color: otherColor, textAlign }}>
                    <TextSourceComponent source={def.description} />
                </Text>
            )}
        </View>
    )
}
export { StatDefinition, StatComponent }
