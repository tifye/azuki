import { Assert } from '@/lib/assert'
import { ChildrenSourceKey, ComponentDefinition } from './definition'
import { createContext, useContext, useState } from 'react'
import { _SourcesStackComponent } from './stack'
import { View } from 'react-native'
import { RenderComponent } from './renderComponent'
import { componentMap } from './components'
import { useMutation } from '@tanstack/react-query'

type FormContextType = {
    upsert: (key: string, value: any) => void
    submit: () => void
}
const FormContext = createContext<FormContextType | undefined>(undefined)

export function useForm() {
    return useContext(FormContext)
}

type FormDefinition = ComponentDefinition<{
    target: string
    children: ComponentDefinition[] | ChildrenSourceKey
}>
export function FormComponent(def: FormDefinition) {
    Assert(def.type === 'form', `expected type 'form' but got ${def.type}`)
    Assert(
        typeof def.target === 'string',
        `expected 'target' to be strin but got: ${def.target}`,
    )
    const [values, SetValues] = useState<{ [key: string]: any }>({})
    const q = useMutation({
        mutationKey: [def.target],
        mutationFn: async function () {
            const res = await fetch(def.target, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            if (res.status > 299) {
                throw new Error(await res.text())
            }
        },
    })

    function upsert(key: string, value: any) {
        SetValues((old) => {
            old[key] = value
            return old
        })
    }

    function submit() {
        q.mutate()
    }

    let children: JSX.Element
    if (typeof def.children === 'string') {
        children = <_SourcesStackComponent queryKey={def.children} />
    } else {
        children = (
            <>
                {def.children.map((comp, idx) => (
                    <View key={idx + comp.type} style={{ flexGrow: 1 }}>
                        {RenderComponent(comp, idx + comp.type, componentMap)}
                    </View>
                ))}
            </>
        )
    }

    return (
        <FormContext.Provider value={{ submit, upsert }}>
            {children}
        </FormContext.Provider>
    )
}
