import { createContext, useContext, useEffect, useState } from "react"

const EventsContext = createContext();

export const EventsProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(async (response) => {
                    const data = await response.json(); 
                    setPosts(data.slice(0, 10));
                });
        }, 1000);
    }, []);

    function removePost(id) {
        const newPosts = posts.filter(post => post.id !== id);
        setPosts(newPosts);
    }

    function getPost(id) {
        return posts.find((item) => item.id === id);
    }

    function addPost(data) {
        const updatedPosts = posts;
        updatedPosts.push({
            id: posts.length,
            title: data["title"],
            body: data["body"],
        })
        setPosts(updatedPosts);
    }

    return (
        <EventsContext.Provider value={{posts, setPosts, removePost, addPost, getPost}}>
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => useContext(EventsContext);
