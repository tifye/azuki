import { Text, View } from 'react-native'
import { ComponentDefinition, TextSource } from "./definition"
import { Assert } from '@/lib/assert'
import { useThemeColor } from '../Themed'
import { useTextSource } from './hooks/useTextSource'

type LabelDefinition = ComponentDefinition & {
    text: TextSource
}
function LabelComponent(def: LabelDefinition) {
    Assert(def.type === "label", "expected type 'label'")
    const text = useTextSource(def.text)
    const textColor = useThemeColor({}, 'text')
    return <View style={{
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 999,
    }}>
        <Text style={{
            fontSize: 24,
            color: textColor
        }}>
            {text}
        </Text>
    </View>
}

export { LabelDefinition, LabelComponent }