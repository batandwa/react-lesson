import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Event() {
    const [post, setPost] = useState();
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(async (response) => {
                const data = await response.json();
                setPost(data);
            })
    }, []);

    if(post)
        return (
            <>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <hr />
                <Link to="/">Go back home</Link>
            </>
        );
    else
        return (
            <div>
                Loading details for event {id}
            </div>
        );
}
