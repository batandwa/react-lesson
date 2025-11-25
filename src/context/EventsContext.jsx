import { createContext, useContext } from "react";
import { useLocalStateReducer } from "../hooks/local-state-reducer";
import { postReducer } from "../reducers/post-reducer";

/**
 * EventsContext
 *
 * This file sets up a React Context for managing and providing application-wide
 * state related to "events" (or "posts" in this case). It uses the Context API
 * to avoid prop drilling and make state accessible to any component in the tree.
 *
 * Key Concepts:
 * 1. **`createContext`**: Creates a Context object. Components that need to access
 *    this context will subscribe to it.
 *    @see {@link https://react.dev/learn/passing-data-deeply-with-context#step-1-create-the-context}
 * 2. **`useContext`**: A hook that allows a functional component to subscribe to
 *    a context and read its value.
 *    @see {@link https://react.dev/learn/passing-data-deeply-with-context#step-2-use-the-context}
 * 3. **Provider Component (`EventsProvider`)**: A special component that provides
 *    the context value to its descendants. Any component within `EventsProvider`
 *    can access the context value using the `useEvents` custom hook.
 *    @see {@link https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context}
 * 4. **Custom Hook (`useEvents`)**: A convenient way to consume the context.
 *    It encapsulates the `useContext(EventsContext)` call, providing a cleaner
 *    API for components to use.
 *    @see {@link https://react.dev/learn/reusing-logic-with-custom-hooks}
 * 5. **State Management with `useLocalStateReducer`**: This context uses a custom
 *    reducer hook `useLocalStateReducer` (which likely wraps `useReducer` and
 *    persists state to localStorage). This is a powerful pattern for managing
 *    complex state logic.
 *    @see {@link https://react.dev/learn/extracting-state-logic-into-a-reducer}
 *
 * The context provides two main values:
 * - `posts`: An array of post/event objects.
 * - `dispatch`: A function to dispatch actions to the reducer, which will update
 *   the `posts` state.
 */

// Create the context with a default value (can be null or an initial structure).
const EventsContext = createContext();

/**
 * EventsProvider Component
 *
 * This component wraps the part of the application that needs access to the events state.
 * It initializes the state using the `useLocalStateReducer` hook and provides the
 * state and dispatch function to all its children via the EventsContext.Provider.
 *
 * Props:
 * - `children` (ReactNode): The components that will have access to this context.
 */
export const EventsProvider = ({children}) => {
    // Initialize state using a custom reducer hook.
    // `useLocalStateReducer` likely combines `useReducer` with localStorage persistence.
    // - `postReducer`: The reducer function that handles state updates based on dispatched actions.
    // - `[]`: The initial state for the posts (an empty array).
    // - `"posts"`: The key used for storing the state in localStorage.
    // const [posts, setPosts] = useState([]); // Example of using useState instead.
    // const [posts, dispatch] = useReducer(postReducer, []); // Example of using standard useReducer.
    const [posts, dispatch] = useLocalStateReducer(postReducer, [], "posts");

    // Example of fetching initial data.
    // This `useEffect` would typically run once when the component mounts to fetch data from an API.
    // The `dispatch` function is then used to update the state with the fetched data.
    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch("https://hp-api.onrender.com/api/characters/students")
    //             .then(async (response) => {
    //                 const data = await response.json(); 
    //                 // setPosts(data.slice(0, 10)); // How you'd update with useState.
    //                 dispatch({
    //                     type: "initialise", // Action type for the reducer.
    //                     posts: data         // Payload for the action.
    //                 });
    //             });
    //     }, 1000); // Simulates a network delay.
    // }, []); // Empty dependency array means this effect runs only once.

    // The Provider component makes the `posts` state and `dispatch` function
    // available to any descendant component that calls `useEvents()`.
    return (
        <EventsContext.Provider value={{posts, dispatch}}>
            {children}
        </EventsContext.Provider>
    )
}

/**
 * useEvents Custom Hook
 *
 * This hook provides a simple and consistent way for components to consume the EventsContext.
 * It returns the current context value, which includes `posts` and `dispatch`.
 *
 * By using a custom hook, we abstract away the `useContext(EventsContext)` call,
 * making the component code cleaner and providing a single point of definition
 * for how the context is consumed. If the context implementation changes, we only
 * need to update this hook.
 */
export const useEvents = () => useContext(EventsContext);
