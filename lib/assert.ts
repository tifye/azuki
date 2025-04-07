export function Assert(cond: boolean, msg: string) {
    if (!cond) throw new Error(msg)
}