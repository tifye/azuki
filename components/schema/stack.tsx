import { Assert } from '@/lib/assert'
import { ComponentDefinition, Schema } from './definition'
import { RenderComponent } from './renderComponent'
import { componentMap } from './components'
import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

type ChildrenSourceKey = string
type StackDefintion = ComponentDefinition & {
    orientation: 'vertical' | 'horizontal'
    gap?: number
    children: ComponentDefinition[] | ChildrenSourceKey
}
function StackComponent(def: StackDefintion) {
    Assert(def.type === 'stack', "expected type 'stack'")
    Assert(
        def.orientation === 'vertical' || def.orientation === 'horizontal',
        'unexpected stack orientation',
    )

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
        <View
            style={{
                display: 'flex',
                gap: def.gap ?? 16,
                maxWidth: '100%',
                flexDirection:
                    def.orientation === 'vertical' ? 'column' : 'row',
            }}
        >
            {children}
        </View>
    )
}

function _SourcesStackComponent({ queryKey }: { queryKey: string }) {
    const q = useQuery<Schema>({
        queryKey: [queryKey],
        queryFn: () => {
            return { components: [] }
        },
        enabled: false,
    })
    return (
        <>
            {q.data?.components.map((comp, idx) => (
                <View key={idx + comp.type} style={{ flexGrow: 1 }}>
                    {RenderComponent(comp, idx + comp.type, componentMap)}
                </View>
            ))}
        </>
    )
}

export { StackDefintion as HorizontalStackDefintion, StackComponent }
