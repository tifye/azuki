import { Assert } from '@/lib/assert'
import { ComponentDefinition, Schema } from './schema/definition'
import { useThemeColor } from './Themed'
import { TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryClient } from '@tanstack/react-query'

type TextInputDefinition = ComponentDefinition<{
    initialValue?: string
}>
function TextInputComponent(def: TextInputDefinition) {
    Assert(
        def.type === 'textInput',
        `expected type 'textInput' but got '${def.type}'`,
    )
    const [input, setInput] = useState(def.initialValue)
    const debouncedInput = useDebounce(input, 500)
    const primary = useThemeColor({}, 'primary')
    const base100 = useThemeColor({}, 'base100')
    const accent = useThemeColor({}, 'accent')
    const qclient = useQueryClient()

    async function f() {
        qclient.fetchQuery<Schema>({
            queryKey: ['search'],
            queryFn: async function () {
                if (input === '') {
                    return { components: [] }
                }
                const res = await fetch(
                    `http://192.168.18.175:8484/nekopara/schema?input=${debouncedInput}`,
                )
                if (res.status > 299) {
                    throw new Error(await res.text())
                }
                return res.json()
            },
        })
    }

    function handleSubmit() {
        f()
    }

    useEffect(() => {
        if (input === undefined) return
        f()
    }, [debouncedInput])

    return (
        <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            selectionColor={accent}
            submitBehavior="newline"
            style={{
                backgroundColor: base100,
                padding: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: primary,
                color: primary,
            }}
        />
    )
}
export { TextInputDefinition, TextInputComponent }
