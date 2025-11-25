import { useEffect, useReducer } from "react"

/**
 * useLocalStateReducer Custom Hook
 *
 * This custom hook combines React's `useReducer` with `localStorage` to create
 * a state management solution that persists state across browser sessions.
 * It's a powerful pattern for managing complex state that needs to survive page reloads.
 *
 * Key Concepts:
 * 1. **`useReducer`**: A React hook that is an alternative to `useState`. It's
 *    typically used for managing more complex state logic where the next state
 *    depends on the previous one. It involves a reducer function and a dispatch function.
 *    @see {@link https://react.dev/learn/extracting-state-logic-into-a-reducer}
 * 2. **`useEffect`**: A hook that lets you perform side effects in functional components.
 *    Here, it's used to synchronize the state with `localStorage` whenever the state changes.
 *    @see {@link https://react.dev/learn/synchronizing-with-effects}
 * 3. **`localStorage`**: A web storage API that allows you to store key-value pairs
 *    in a web browser with no expiration time. The data persists even after the browser is closed.
 *    @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 * 4. **Lazy Initialization**: The `initializer` function is used as the third
 *    argument to `useReducer`. This function is only called once during the initial
 *    render, making it perfect for reading from `localStorage` without causing
 *    a server-client hydration mismatch or doing it on every render.
 *    @see {@link https://react.dev/reference/react/useReducer#lazy-initialization}
 */
export function useLocalStateReducer(reducer, initial, key) {
    /**
     * Initializer function for `useReducer`.
     * This function is called only once during the initial render of the component.
     * It attempts to read the state from `localStorage`.
     */
    const initializer = () => {
        try {
            // Attempt to get the item from localStorage using the provided key.
            const json = localStorage.getItem(key);
            // If an item exists, parse it from JSON and return it.
            // Otherwise, return the initial state.
            return json ? JSON.parse(json) : initial;
        } catch (error) {
            // If an error occurs during JSON parsing (e.g., corrupted data),
            // catch it and return the initial state to prevent the app from crashing.
            console.error(`Failed to parse localStorage item for key "${key}":`, error);
            return initial;
        }
    }

    // Initialize the state and dispatch function using `useReducer`.
    // The `initializer` function ensures that the initial state is read from `localStorage`.
    const [state, dispatch] = useReducer(reducer, initial, initializer);

    // Use `useEffect` to save the state to `localStorage` whenever it changes.
    // The effect will run after every render where `state` or `key` has changed.
    useEffect(() => {
        try {
            // Stringify the state and save it to `localStorage` with the specified key.
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            // Handle potential errors, e.g., if localStorage is full or disabled.
            console.error(`Failed to set localStorage item for key "${key}":`, error);
        }
    }, [state, key]); // Dependency array: the effect runs only if `state` or `key` changes.

    // Return the current state and the dispatch function, just like `useReducer`.
    return [state, dispatch];
}
