import { Image, View } from 'react-native'
import { ComponentDefinition, TextSource } from './definition'
import { Assert } from '@/lib/assert'
import { useTextSource } from './hooks/useTextSource'

type ImageDefinition = ComponentDefinition & {
    source: TextSource
}
function ImageComponent(def: ImageDefinition) {
    Assert(def.type === 'image', "expected type 'image'")
    const source = useTextSource(def.source)
    return (
        <View
            style={{
                borderRadius: 8,
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}
        >
            {source && (
                <Image
                    source={{ uri: source }}
                    style={{
                        width: '100%',
                        aspectRatio: 1.5,
                        resizeMode: 'cover',
                    }}
                />
            )}
        </View>
    )
}

export { ImageDefinition, ImageComponent }
