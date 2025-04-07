import { ComponentDefinition, Schema } from '@/components/schema/definition';
import componentMap from '@/components/schema/components';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';

const _schema: Schema = {
    components: [
        {
            "type": "label",
            "text": {
                "type": "http",
                "url": "https://shigure-683956955842.europe-west1.run.app/activity",
                "fieldpath": "Author"
            }
        },
        {
            "type": "label",
            "text": {
                "type": "http",
                "url": "https://shigure-683956955842.europe-west1.run.app/activity",
                "fieldpath": "Title"
            }
        },
        {
            "type": "image",
            "source": {
                "type": "http",
                "url": "https://shigure-683956955842.europe-west1.run.app/activity",
                "fieldpath": "ThumbnailUrl"
            }
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-a",
            "text": "Trigger"
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-a",
            "text": {
                "type": "string",
                "value": "Trigger"
            }
        },
        {
            "type": "button",
            "target": "http://star-sage-sanctum.shigure.joshuadematas.me/trigger-b",
            "text": {
                "type": "http",
                "url": "https://shigure-683956955842.europe-west1.run.app/activity",
                "fieldpath": "Title"
            }
        },
    ]
}

function RenderComponent(comp: ComponentDefinition, key: number): React.JSX.Element {
    console.debug(comp)
    if (typeof comp.type !== "string") throw new Error("expected 'typeof comp.type' to be string")
    const C = componentMap[comp.type]
    if (!C) throw new Error(`unexpected component type ${comp.type}`)
    return <C key={key} {...comp} />
}

export default function TabOneScreen() {
    const [refreshing, setRefreshing] = useState(false)
    const [schema, setSchema] = useState<Schema | null>(null)

    async function getSchema() {
        // const res = await fetch("http://star-sage-sanctum.shigure.joshuadematas.me/schema")
        // if (res.status > 299) {
        //     throw new Error(await res.text())
        // }
        // setSchema(await res.json())
        setSchema(_schema)
    }
    useEffect(() => {
        getSchema()
    }, [])

    async function onRefresh() {
        setRefreshing(true)
        try {
            await getSchema()
        } finally {
            setRefreshing(false)
        }

    }
    return (
        <ScrollView>
            <View style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24,
            }}>
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                {schema &&
                    <>
                        {schema.components.map(RenderComponent)}
                    </>
                }
            </View>
        </ScrollView>
    );
}




