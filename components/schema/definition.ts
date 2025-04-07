
type ComponentDefinition<T = any> = {
    type: string,
} & Omit<T, 'type'>


type Schema = {
    components: ComponentDefinition[]
}

export {
    ComponentDefinition,
    Schema,
}