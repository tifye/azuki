import { useEffect, useState } from 'react'
import { HTTPTextSource, TextSource } from '../definition'
import { Assert } from '@/lib/assert'
import { useQuery, useQueryClient } from '@tanstack/react-query'

function LiveTextSource({
    type,
    url,
    fieldpath,
    pollRate,
}: HTTPTextSource): React.JSX.Element {
    Assert(type === 'http', "expected type 'http'")
    Assert(typeof url === 'string', 'exptected url string')
    Assert(url.length > 0, 'exptected url')

    const [text, setText] = useState('')
    const q = useQuery({
        queryKey: [url, { pollRate }],
        queryFn: () => requestTextSource(url, fieldpath),
        refetchInterval: pollRate ? pollRate : undefined,
    })

    useEffect(() => {
        if (!q.isSuccess) return

        if (typeof q.data === 'string') {
            return setText(q.data)
        }

        Assert(fieldpath !== undefined, 'no fieldpath provided')
        const text = getNestedValue(q.data, fieldpath!)
        if (text) {
            setText(text)
        } else {
            console.error("did not find nested value: '" + fieldpath + "'")
        }
    }, [q.data])

    return <>{text}</>
}

function TextSourceComponent({
    source,
}: {
    source?: TextSource
}): React.JSX.Element {
    if (!source) {
        console.warn('undefined text source')
        return <>{''}</>
    }

    if (typeof source === 'string') {
        return <>{source}</>
    }

    if (source.type === 'string') {
        Assert(typeof source.value === 'string', "expected 'string' type")
        return <>{source.value}</>
    }

    Assert(source.type === 'http', "expected type 'http'")
    return <LiveTextSource {...source} />
}

function useTextSource(source?: TextSource) {
    const [text, setText] = useState('')
    const client = useQueryClient()

    useEffect(() => {
        if (!source) {
            return
        }

        if (typeof source === 'string') {
            return setText(source)
        }

        if (source.type === 'string') {
            Assert(typeof source.value === 'string', "expected 'string' type")
            return setText(source.value)
        }

        Assert(source.type === 'http', "expected type 'http'")
        const fieldpath = source.fieldpath
        const url = source.url

        async function f() {
            try {
                const data = await client.fetchQuery({
                    queryKey: [url],
                    queryFn: () => requestTextSource(url, fieldpath),
                })

                if (typeof data === 'string') {
                    return setText(data)
                }

                Assert(fieldpath !== undefined, 'no fieldpath provided')
                const text = getNestedValue(data, fieldpath!)
                if (text) {
                    return setText(text)
                }

                console.error("did not find nested value: '" + fieldpath + "'")
                setText('')
            } catch (error) {
                console.error(error)
            }
        }
        f()
    }, [source])

    return text
}

function getNestedValue<T>(obj: T, path: string): any {
    const fields = path.split('.')
    return fields.reduce((acc: any, part: string) => {
        if (acc && typeof acc === 'object') {
            return acc[part as keyof typeof acc]
        }
        return undefined
    }, obj)
}

async function requestTextSource(
    url: string,
    fieldpath?: string,
): Promise<any | string> {
    const res = await fetch(url)
    if (res.status > 299) {
        throw new Error(await res.text())
    }

    if (!fieldpath) {
        return res.text()
    }
    return res.json()
}

export { useTextSource, requestTextSource, TextSourceComponent }
