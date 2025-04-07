import { Image } from "react-native";
import { ComponentDefinition, TextSource } from "./definition";
import { Assert } from "@/lib/assert";
import { useTextSource } from "./hooks/useTextSource";

type ImageDefinition = ComponentDefinition & {
    source: TextSource
}
function ImageComponent(def: ImageDefinition) {
    Assert(def.type === "image", "expected type 'image'")
    const source = useTextSource(def.source)
    return <Image
        source={{ uri: source }}
        style={{
            aspectRatio: 1.5,
            width: "100%",
            resizeMode: "cover",
            borderRadius: 28,
        }} />
}

export { ImageDefinition, ImageComponent }