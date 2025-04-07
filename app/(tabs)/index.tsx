import { ComponentDefinition, Schema } from '@/components/schema/definition';
import componentMap from '@/components/schema/components';
import { ScrollView, View } from 'react-native';

const schema: Schema = {
    components: [
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-a",
            "text": "Trigger"
        },
        {
            "type": "label",
            "text": "Label"
        },
        {
            "type": "image",
            "source": "https://media.discordapp.net/attachments/1211775725628166186/1351535878647844956/image.png?ex=67f5195f&is=67f3c7df&hm=f6f47c6c911fc6d46ae5060a9c16ab7348aabadc25f42306e2c0feb95905d89b&=&format=webp&quality=lossless&width=1278&height=1026"
        },
        {
            "type": "label",
            "text": "Label"
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-b",
            "text": "Trigger"
        },
        {
            "type": "label",
            "text": "Label"
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-b",
            "text": "Trigger"
        },
        {
            "type": "label",
            "text": "Label"
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-b",
            "text": "Trigger"
        },
        {
            "type": "label",
            "text": "Label"
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-b",
            "text": "Trigger"
        }
    ]
}

function RenderComponent(comp: ComponentDefinition, key: number): React.JSX.Element {
    if (typeof comp.type !== "string") throw new Error("expected 'typeof comp.type' to be string")
    const C = componentMap[comp.type]
    if (!C) throw new Error(`unexpected component type ${comp.type}`)
    return <C key={key} {...comp} />
}

export default function TabOneScreen() {
    return (
        <ScrollView>
            <View style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
            }}>
                {schema.components.map(RenderComponent)}
            </View>
        </ScrollView>
    );
}




