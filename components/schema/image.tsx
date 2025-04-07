import { Image } from "react-native";
import { ComponentDefinition } from "./definition";
import { Assert } from "@/lib/assert";

type ImageDefinition = ComponentDefinition & {
    source: string
}
function ImageComponent(def: ImageDefinition) {
    Assert(def.type === "image", "expected type 'image'")
    Assert(typeof def.source === "string", "expected source to be type 'string'")
    Assert(def.source.length > 0, "no image source given")
    return <Image source={{ uri: def.source }} style={{ aspectRatio: 1.5, width: "100%", resizeMode: "contain" }} />
}

export { ImageDefinition, ImageComponent }