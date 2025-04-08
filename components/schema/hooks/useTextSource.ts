import { useEffect, useState } from "react";
import { TextSource } from "../definition";
import { Assert } from "@/lib/assert";
import { useQueryClient } from "@tanstack/react-query";

function useTextSource(source?: TextSource) {
    const [text, setText] = useState("")
    const client = useQueryClient()

    useEffect(() => {
        if (!source) {
            return
        }

        if (typeof source === "string") {
            return setText(source)
        }

        if (source.type === "string") {
            Assert(typeof source.value === "string", "expected 'string' type")
            return setText(source.value)
        }

        Assert(source.type === "http", "expected type 'http'")
        const fieldpath = source.fieldpath
        const url = source.url

        async function f() {
            try {
                const data = await client.fetchQuery({
                    queryKey: [url],
                    queryFn: () => requestTextSource(url, fieldpath),
                })

                if (typeof data === "string") {
                    return setText(data)
                }

                Assert(fieldpath !== undefined, "no fieldpath provided")
                const text = getNestedValue(data, fieldpath!)
                if (text) {
                    return setText(text)
                }

                console.error("did not find nested value: '" + fieldpath + "'")
                setText("")
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
    }, obj);
}

async function requestTextSource(url: string, fieldpath?: string): Promise<any | string> {
    const res = await fetch(url)
    if (res.status > 299) {
        throw new Error(await res.text())
    }

    if (!fieldpath) {
        return res.text()
    }
    return res.json()
}

export { useTextSource, requestTextSource }