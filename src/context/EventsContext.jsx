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
        // This is the wrong way to do this 
        // this data should be fetched using an API request.
        // The data contained in the posts value could be 
        // outdated.
        return posts.find((item) => item.id === id);
    }

    function addPost(data) {
        const updatedPosts = posts;
        
        let newId = 0;
        for (let i = 0; i < posts.length; i++) {
            const item = posts[i];
            if(item.id >= newId) {
                newId = item.id + 1;
            }
        }
        updatedPosts.push({
            id: newId,
            title: data["title"],
            body: data["body"],
        })
        setPosts(updatedPosts);
    }

    function updatePost(id, data) {
        const updatedPosts = posts.map(item => {
            if(item.id == id) {
                item["title"] = data["title"];
                item["body"] = data["body"];
            }
            return item;
        });

        setPosts(updatedPosts);
    }

    return (
        <EventsContext.Provider value={{posts, setPosts, removePost, addPost, getPost, updatePost}}>
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => useContext(EventsContext);
