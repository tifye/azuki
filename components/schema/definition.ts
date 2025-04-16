type ComponentsMap = {
    [key: string]: (def: any) => React.JSX.Element
}

type ChildrenSourceKey = string
type ComponentDefinition<T = any> = {
    type: string
} & Omit<T, 'type'>

type Schema = {
    components: ComponentDefinition[]
}

type HTTPTextSource = {
    type: 'http'
    url: string
    fieldpath?: string
    pollRate?: number
}
type StringTextSource = {
    type: 'string'
    value: string
}
type TextSource = string | HTTPTextSource | StringTextSource

type Placement = 'start' | 'center' | 'end'

export {
    ComponentsMap,
    ComponentDefinition,
    ChildrenSourceKey,
    Schema,
    HTTPTextSource,
    StringTextSource,
    TextSource,
    Placement,
}
