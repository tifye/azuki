import { Pressable, Text } from "react-native";
import * as Haptics from "expo-haptics";
import { ComponentDefinition, HTTPTextSource, StringTextSource } from "./definition";
import { Assert } from "@/lib/assert";
import { useThemeColor } from "../Themed";
import { useTextSource } from "./hooks/useTextSource";


type ButtonDefinition = ComponentDefinition<{
    target: string
    text: string | HTTPTextSource | StringTextSource
}>
function ButtonComponent(def: ButtonDefinition) {
    Assert(def.type === "button", "expected type 'button'")
    const text = useTextSource(def.text)
    const textColor = useThemeColor({}, 'text')

    function handeOnPress() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        console.log("trigger pressed")
        fetch(def.target)
    }

    return <Pressable
        style={({ pressed }) => [
            {
                backgroundColor: "#163028",
                padding: 24,
                borderRadius: 999,
                opacity: pressed ? 0.7 : 1
            }
        ]
        }
        onPress={() => handeOnPress()}
    >
        <Text style={{
            color: textColor
        }}>
            {text}
        </Text>
    </Pressable>
}

export { ButtonDefinition, ButtonComponent }