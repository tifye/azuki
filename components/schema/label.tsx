import { Text, View } from 'react-native'
import { ComponentDefinition, TextSource } from './definition'
import { Assert } from '@/lib/assert'
import { useThemeColor } from '../Themed'
import { TextSourceComponent } from './hooks/useTextSource'

type LabelDefinition = ComponentDefinition & {
    text: TextSource
    size?: number
}
function LabelComponent(def: LabelDefinition) {
    Assert(def.type === 'label', "expected type 'label'")
    const textColor = useThemeColor({}, 'baseContent')
    return (
        <View>
            <Text
                style={{
                    fontSize: def.size ?? 20,
                    color: textColor,
                }}
            >
                <TextSourceComponent source={def.text} />
            </Text>
        </View>
    )
}

export { LabelDefinition, LabelComponent }
