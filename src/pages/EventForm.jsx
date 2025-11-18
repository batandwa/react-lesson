import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export default function EventForm() {
    const {posts, dispatch} = useEvents();
    const navigate = useNavigate();
    const {id} = useParams();

    function handleSubmit(data) {
        if(!data.get("id")) {
            const post = {
                name: data.get("name"),
                ancestry: data.get("ancestry"),
            };
            // addPost(post);
            dispatch({
                type: "added",
                post
            });
        } else {
            const post = {
                name: data.get("name"),
                ancestry: data.get("ancestry"),
            };
            // updatePost(data.get("id"), post);
            dispatch({
                type: "updated",
                id: data.get("id"),
                post
            });
        }
        navigate("/events");
    }

    // const post = getPost(parseInt(id)) || {};
    const post = posts.find((item) => item.id === id);

    return (
        <>
            <h2>Event</h2>
            <form action={handleSubmit}>
                <input type="hidden" name="id" defaultValue={post.id} />
                <div>
                    Title&nbsp;&nbsp;
                    <input type="text" name="name" defaultValue={post.name} />
                </div>
                <div>
                    Body&nbsp;&nbsp;
                    <textarea name="ancestry" defaultValue={post.ancestry}></textarea>
                </div>
                <div>
                    <input type="submit" />
                    <Link to="/events">Go back to events</Link>
                </div>
            </form>
        </>
    )
}