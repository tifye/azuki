import { Pressable, Text } from 'react-native'
import * as Haptics from 'expo-haptics'
import {
    ComponentDefinition,
    HTTPTextSource,
    StringTextSource,
} from './definition'
import { Assert } from '@/lib/assert'
import { useThemeColor } from '../Themed'
import { TextSourceComponent } from './hooks/useTextSource'

type ButtonDefinition = ComponentDefinition<{
    target: string
    text: string | HTTPTextSource | StringTextSource
}>
function ButtonComponent(def: ButtonDefinition) {
    Assert(def.type === 'button', "expected type 'button'")
    const textColor = useThemeColor({}, 'primaryContent')
    const bgColor = useThemeColor({}, 'primary')
    const shadowColor = useThemeColor({}, 'neutral')

    function handeOnPress() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        console.log('trigger pressed')
        fetch(def.target)
    }

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: bgColor,
                    padding: 16,
                    borderRadius: 999,
                    opacity: pressed ? 0.7 : 1,
                    shadowColor: shadowColor,
                    shadowOffset: {
                        width: -1,
                        height: 2,
                    },
                    shadowRadius: 2,
                    shadowOpacity: 1,
                },
            ]}
            onPress={() => handeOnPress()}
        >
            <Text
                style={{
                    color: textColor,
                    textAlign: 'center',
                    fontFamily: '',
                    fontSize: 16,
                }}
            >
                <TextSourceComponent source={def.text} />
            </Text>
        </Pressable>
    )
}

export { ButtonDefinition, ButtonComponent }
