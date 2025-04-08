import { createContext, useContext, useEffect, useState } from 'react'
import { Schema } from '../definition'

type SchemaContextType = {
    source: string
    setSource: (s: string) => void
    loadSchema: () => Promise<void>
    schema: Schema
}

const SchemaContext = createContext<SchemaContextType | null>(null)

function SchemaContextProvider({
    initialSource,
    children,
}: {
    initialSource?: string
    children: JSX.Element
}) {
    const [source, setSource] = useState(
        initialSource ?? 'http://192.168.18.175:8484/schema',
    )
    const [schema, setSchema] = useState<Schema>({ components: [] })

    async function loadSchema() {
        const res = await fetch(source)
        if (res.status > 299) {
            throw new Error(await res.text())
        }
        setSchema(await res.json())
        // setSchema(_schema)
    }

    useEffect(() => {
        loadSchema()
    }, [source])

    return (
        <SchemaContext.Provider
            value={{
                loadSchema,
                setSource,
                source,
                schema,
            }}
        >
            {children}
        </SchemaContext.Provider>
    )
}

function useSchema(): SchemaContextType {
    const s = useContext(SchemaContext)
    if (s === null)
        throw new Error(
            "'useSchema' must be called within a 'SchemaContextProvider'",
        )
    return s
}

export { useSchema, SchemaContextProvider }
