import { Assert } from "@/lib/assert";
import { ComponentDefinition } from "./definition";
import { RenderComponent } from "./renderComponent";
import { componentMap } from "./components";
import { View } from "react-native";

type StackDefintion = ComponentDefinition & {
    orientation: 'vertical' | 'horizontal'
    gap?: number
    children: ComponentDefinition[]
}
function StackComponent(def: StackDefintion) {
    Assert(def.type === "stack", "expected type 'stack'")
    Assert(def.orientation === 'vertical' || def.orientation === 'horizontal', "unexpected stack orientation")
    return <View style={{
        display: 'flex',
        gap: def.gap ?? 16,
        maxWidth: "100%",
        flexDirection: def.orientation === 'vertical' ? "column" : "row"
    }}>
        {def.children.map((comp, idx) =>
            <View style={{ flexGrow: 1 }}>
                {RenderComponent(comp, idx + comp.type, componentMap)}
            </View>)
        }
    </View>
}

export { StackDefintion as HorizontalStackDefintion, StackComponent }