import { useEffect, useReducer } from "react"

export function useLocalStateReducer(reducer, initial, key) {
    const initializer = () => {
        try {
            const json = localStorage.getItem(key)
            return json ? JSON.parse(json) : initial
        } catch {
            return initial
        }
    }

    const [state, dispatch] = useReducer(reducer, initial, initializer)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return [state, dispatch]
}
