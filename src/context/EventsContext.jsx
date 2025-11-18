import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { postReducer } from "../reducers/post-reducer";
import { useLocalStateReducer } from "../hooks/local-state-reducer";

const EventsContext = createContext();

export const EventsProvider = ({children}) => {
    // const [posts, setPosts] = useState([]);
    // const [posts, dispatch] = useReducer(postReducer, []);
    const [posts, dispatch] = useLocalStateReducer(postReducer, [], "posts")

    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch("https://hp-api.onrender.com/api/characters/students")
    //             .then(async (response) => {
    //                 const data = await response.json(); 
    //                 // setPosts(data.slice(0, 10));
    //                 dispatch({
    //                     type: "initialise",
    //                     posts: data
    //                 });
    //             });
    //     }, 1000);
    // }, []);

    return (
        <EventsContext.Provider value={{posts, dispatch}}>
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => useContext(EventsContext);
