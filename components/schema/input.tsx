import { Assert } from '@/lib/assert'
import { ComponentDefinition, Schema, TextSource } from './definition'
import { useThemeColor } from '../Themed'
import { TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryClient } from '@tanstack/react-query'
import { useTextSource } from './hooks/useTextSource'

type TextInputDefinition = ComponentDefinition<{
    initialValue?: string
    debounce?: number
    name: string
    target?: string
    placeholder?: TextSource
    hiddenInput?: boolean
}>
function TextInputComponent(def: TextInputDefinition) {
    Assert(
        def.type === 'textInput',
        `expected type 'textInput' but got '${def.type}'`,
    )
    Assert(
        typeof def.name === 'string',
        "expected 'name' to be string, got: " + def.name,
    )
    Assert(def.name.length > 0, "requires 'name' property")
    const [input, setInput] = useState(def.initialValue)
    const debouncedInput = useDebounce(input, def.debounce ?? 500)
    const primary = useThemeColor({}, 'primary')
    const base100 = useThemeColor({}, 'base100')
    const accent = useThemeColor({}, 'accent')
    const qclient = useQueryClient()
    const placeholder = useTextSource(def.placeholder)

    async function f() {
        qclient.fetchQuery<Schema | string>({
            queryKey: [def.name],
            queryFn: async function () {
                if (input === '') {
                    return { components: [] }
                }

                if (!def.target) return input

                Assert(
                    typeof def.target === 'string',
                    "expected 'target' to be string",
                )

                const res = await fetch(`${def.target}?input=${debouncedInput}`)
                if (res.status > 299) {
                    throw new Error(await res.text())
                }
                const r = await res.json()
                return r
            },
        })
    }

    function handleSubmit() {
        f()
    }

    useEffect(() => {
        if (input === undefined || input === '') return
        if (def.target === undefined) return

        f()
    }, [debouncedInput])

    return (
        <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            selectionColor={accent}
            submitBehavior="newline"
            placeholder={placeholder}
            secureTextEntry={def.hiddenInput}
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
