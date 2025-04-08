import { ComponentDefinition, ComponentsMap } from './definition'

export function RenderComponents(
    comps: ComponentDefinition[],
    map: ComponentsMap,
): JSX.Element {
    return <>{comps.map((comp, idx) => RenderComponent(comp, idx, map))}</>
}

export function RenderComponent(
    comp: ComponentDefinition,
    key: any,
    map: ComponentsMap,
): JSX.Element {
    console.debug(comp)
    if (typeof comp.type !== 'string')
        throw new Error("expected 'typeof comp.type' to be string")
    const C = map[comp.type]
    if (!C) throw new Error(`unexpected component type ${comp.type}`)
    return <C key={key} {...comp} />
}
