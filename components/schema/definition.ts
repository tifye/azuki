
type ComponentDefinition<T = any> = {
    type: string,
} & Omit<T, 'type'>


type Schema = {
    components: ComponentDefinition[]
}

type HTTPTextSource = {
    type: 'http'
    url: string
    fieldpath?: string
}
type StringTextSource = {
    type: 'string'
    value: string
}
type TextSource = string | HTTPTextSource | StringTextSource

export {
    ComponentDefinition,
    Schema,
    HTTPTextSource,
    StringTextSource,
    TextSource
}