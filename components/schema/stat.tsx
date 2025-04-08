import { Assert } from "@/lib/assert";
import { ComponentDefinition, TextSource } from "./definition";
import { View, Text, FlexAlignType } from "react-native";
import { useThemeColor } from "../Themed";
import { useTextSource } from "./hooks/useTextSource";

type StatDefinition = ComponentDefinition & {
    title?: TextSource
    description?: TextSource
    value: TextSource
    place: 'start' | 'center' | 'end'
}
function StatComponent(def: StatDefinition) {
    Assert(def.type === "stat", "expected type 'stat'")
    Assert(def.value !== undefined, "expected property 'value' in StatComponent")
    const value = useTextSource(def.value)
    const title = useTextSource(def.title)
    const description = useTextSource(def.description)
    const valueColor = useThemeColor({}, 'secondary')
    const otherColor = useThemeColor({}, 'baseContent')

    let align: FlexAlignType;
    switch (def.place) {
        case 'start':
            align = 'flex-start'
            break
        case "center":
            align = 'center'
            break
        case 'end':
            align = 'flex-end'
            break
        default:
            align = 'flex-start'
            break
    }
    return <View style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        gap: 6
    }}>
        {title &&
            <Text style={{ color: otherColor }}>
                {title}
            </Text>
        }
        <Text style={{
            color: valueColor,
            fontSize: 36,
            fontWeight: 800
        }}>
            {value}
        </Text>
        {description &&
            <Text style={{ color: otherColor }}>
                {description}
            </Text>
        }
    </View>
}
export { StatDefinition, StatComponent }