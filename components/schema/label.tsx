import { Text, useColorScheme, View } from 'react-native'
import { ComponentDefinition } from "./definition"
import { Assert } from '@/lib/assert'
import { useThemeColor } from '../Themed'

type LabelDefinition = ComponentDefinition & {
    text: string
}
function LabelComponent(def: LabelDefinition) {
    Assert(def.type === "label", "expected type 'label'")
    const theme = useColorScheme()
    const textColor = useThemeColor({}, 'text')
    return <View style={{
        padding: 24,
        borderRadius: 999,
    }}>
        <Text style={{
            fontSize: 24,
            color: textColor
        }}>
            {def.text}
        </Text>
    </View>
}

export { LabelDefinition, LabelComponent }