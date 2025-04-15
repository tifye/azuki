import { Text, View } from 'react-native'
import { ComponentDefinition, Placement, TextSource } from './definition'
import { Assert } from '@/lib/assert'
import { useThemeColor } from '../Themed'
import { TextSourceComponent } from './hooks/useTextSource'

type LabelDefinition = ComponentDefinition & {
    text: TextSource
    size?: number
    place?: Placement
}
function LabelComponent(def: LabelDefinition) {
    Assert(def.type === 'label', "expected type 'label'")
    const textColor = useThemeColor({}, 'baseContent')

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
        <View>
            <Text
                style={{
                    fontSize: def.size ?? 20,
                    textAlign: textAlign,
                    color: textColor,
                }}
            >
                <TextSourceComponent source={def.text} />
            </Text>
        </View>
    )
}

export { LabelDefinition, LabelComponent }
