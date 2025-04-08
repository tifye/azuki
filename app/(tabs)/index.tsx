import { Schema } from '@/components/schema/definition'
import { Text, RefreshControl, ScrollView, View } from 'react-native'
import { useEffect, useState } from 'react'
import { RenderComponents } from '@/components/schema/renderComponent'
import { componentMap } from '@/components/schema/components'
import { useThemeColor } from '@/components/Themed'

const _schema: Schema = {
    components: [
        {
            type: 'label',
            text: {
                type: 'http',
                url: 'https://shigure-683956955842.europe-west1.run.app/activity',
                fieldpath: 'Author',
            },
        },
        {
            type: 'label',
            text: {
                type: 'http',
                url: 'https://shigure-683956955842.europe-west1.run.app/activity',
                fieldpath: 'Title',
            },
        },
        {
            type: 'image',
            source: {
                type: 'http',
                url: 'https://shigure-683956955842.europe-west1.run.app/activity',
                fieldpath: 'ThumbnailUrl',
            },
        },
        {
            type: 'button',
            target: 'http://star-sage-sanctum.shigure.joshuadematas.me/trigger-a',
            text: 'Trigger',
        },
        {
            type: 'button',
            target: 'http://star-sage-sanctum.shigure.joshuadematas.me/trigger-a',
            text: {
                type: 'string',
                value: 'Trigger',
            },
        },
        {
            type: 'button',
            target: 'http://star-sage-sanctum.shigure.joshuadematas.me/trigger-b',
            text: {
                type: 'http',
                url: 'https://shigure-683956955842.europe-west1.run.app/activity',
                fieldpath: 'Title',
            },
        },
    ],
}

export default function TabOneScreen() {
    const [refreshing, setRefreshing] = useState(false)
    const [schema, setSchema] = useState<Schema | null>(null)
    const refreshIconColor = useThemeColor({}, 'info')

    async function getSchema() {
        const res = await fetch(
            'http://star-sage-sanctum.shigure.joshuadematas.me/schema',
        )
        if (res.status > 299) {
            throw new Error(await res.text())
        }
        setSchema(await res.json())
        // setSchema(_schema)
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
            <View
                style={{
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                }}
            >
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={refreshIconColor}
                />

                {schema && (
                    <>{RenderComponents(schema.components, componentMap)}</>
                )}
            </View>
        </ScrollView>
    )
}
