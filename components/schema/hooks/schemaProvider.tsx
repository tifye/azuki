import { createContext, useContext, useEffect, useState } from 'react'
import { Schema } from '../definition'
import { useQuery } from '@tanstack/react-query'

type SchemaContextType = {
    source: string
    setSource: (s: string) => void
    loadSchema: () => void
    schema: Schema
    isLoading: boolean
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
    const q = useQuery({
        queryKey: ['schema', source],
        queryFn: async () => {
            const res = await fetch(source)
            if (res.status > 299) {
                throw new Error(await res.text())
            }
            return res.json()
        },
    })

    function loadSchema() {
        q.refetch()
    }

    useEffect(() => {
        loadSchema()
    }, [source])

    useEffect(() => {
        if (!q.data) return
        setSchema(q.data)
    }, [q.data])

    return (
        <SchemaContext.Provider
            value={{
                loadSchema,
                setSource,
                source,
                schema,
                isLoading: q.isLoading,
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
