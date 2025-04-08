import { Pressable, Text } from 'react-native'
import * as Haptics from 'expo-haptics'
import {
    ComponentDefinition,
    HTTPTextSource,
    StringTextSource,
} from './definition'
import { Assert } from '@/lib/assert'
import { useThemeColor } from '../Themed'
import { TextSourceComponent } from './hooks/useTextSource'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type ButtonDefinition = ComponentDefinition<{
    target: string
    text: string | HTTPTextSource | StringTextSource
    invalidatesTargets?: string[]
}>
function ButtonComponent(def: ButtonDefinition) {
    Assert(def.type === 'button', "expected type 'button'")
    const textColor = useThemeColor({}, 'primaryContent')
    const bgColor = useThemeColor({}, 'primary')
    const shadowColor = useThemeColor({}, 'neutral')
    const qclient = useQueryClient()
    const q = useMutation({
        mutationKey: [def.target],
        mutationFn: async function () {
            const res = await fetch(def.target, { method: 'POST' })
            if (res.status > 299) {
                throw new Error(await res.text())
            }
        },
        onSuccess: function () {
            if (!def.invalidatesTargets) return
            Assert(
                Array.isArray(def.invalidatesTargets),
                'expected array of string',
            )
            def.invalidatesTargets.forEach((t) =>
                qclient.invalidateQueries({
                    queryKey: [t],
                    exact: false,
                }),
            )
        },
    })

    async function handeOnPress() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        console.log('trigger pressed')
        q.mutate()
    }

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: bgColor,
                    padding: 16,
                    borderRadius: 8,
                    opacity: pressed ? 0.7 : 1,
                    shadowColor: shadowColor,
                    shadowOffset: {
                        width: -1,
                        height: 2,
                    },
                    shadowRadius: 2,
                    shadowOpacity: 1,
                },
            ]}
            onPress={() => handeOnPress()}
        >
            <Text
                style={{
                    color: textColor,
                    textAlign: 'center',
                    fontFamily: '',
                    fontSize: 16,
                }}
            >
                <TextSourceComponent source={def.text} />
            </Text>
        </Pressable>
    )
}

export { ButtonDefinition, ButtonComponent }
