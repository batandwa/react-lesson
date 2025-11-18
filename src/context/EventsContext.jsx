import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { postReducer } from "../reducers/post-reducer";

const EventsContext = createContext();

export const EventsProvider = ({children}) => {
    // const [posts, setPosts] = useState([]);
    const [posts, dispatch] = useReducer(postReducer, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(async (response) => {
                    const data = await response.json(); 
                    // setPosts(data.slice(0, 10));
                    dispatch({
                        type: "initialise",
                        posts: data.slice(0, 10)
                    });
                });
        }, 1000);
    }, []);

    return (
        <EventsContext.Provider value={{posts, dispatch}}>
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => useContext(EventsContext);
