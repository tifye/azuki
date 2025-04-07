import { useEffect, useState } from "react";
import { TextSource } from "../definition";
import { Assert } from "@/lib/assert";

export function useTextSource(source: TextSource) {
    const [text, setText] = useState("")

    useEffect(() => {
        if (typeof source === "string") {
            setText(source)
            return
        }

        if (source.type === "string") {
            Assert(typeof source.value === "string", "expected 'string' type")
            setText(source.value)
            return
        }

        Assert(source.type === "http", "expected type 'http'")
        const fieldpath = source.fieldpath
        const url = source.url
        async function f() {
            const res = await fetch(url)
            if (res.status > 299) {
                throw new Error(await res.text())
            }

            if (fieldpath) {
                const text = getNestedValue(await res.json(), fieldpath)
                if (text) {
                    setText(text)
                } else {
                    console.error("did not find nested value: '" + fieldpath + "'")
                }
            } else {
                setText(await res.text())
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