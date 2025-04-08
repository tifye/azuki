import { RefreshControl, ScrollView, View } from 'react-native'
import { useState } from 'react'
import { RenderComponents } from '@/components/schema/renderComponent'
import { componentMap } from '@/components/schema/components'
import { useThemeColor } from '@/components/Themed'
import { useQueryClient } from '@tanstack/react-query'
import { useSchema } from '@/components/schema/hooks/schemaProvider'

export default function TabOneScreen() {
    const [refreshing, setRefreshing] = useState(false)
    const refreshIconColor = useThemeColor({}, 'info')
    const qclient = useQueryClient()
    const { schema, loadSchema } = useSchema()
    async function onRefresh() {
        setRefreshing(true)
        try {
            await loadSchema()
            qclient.refetchQueries()
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
