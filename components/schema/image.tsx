import { Image, View } from "react-native";
import { ComponentDefinition, TextSource } from "./definition";
import { Assert } from "@/lib/assert";
import { useTextSource } from "./hooks/useTextSource";

type ImageDefinition = ComponentDefinition & {
    source: TextSource
}
function ImageComponent(def: ImageDefinition) {
    Assert(def.type === "image", "expected type 'image'")
    const source = useTextSource(def.source)
    return <View style={{
        borderRadius: 30,
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    }}>
        <Image
            source={{ uri: source }}
            style={{
                flexGrow: 1,
                aspectRatio: 1.5,
                resizeMode: "cover",
            }} />
    </View>
}

export { ImageDefinition, ImageComponent }