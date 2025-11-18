import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export default function EventForm() {
    const {addPost, getPost, updatePost, dispatch} = useEvents();
    const navigate = useNavigate();
    const {id} = useParams();

    function handleSubmit(data) {
        if(!data.get("id")) {
            const post = {
                title: data.get("title"),
                body: data.get("body"),
            };
            // addPost(post);
            dispatch({
                type: "added",
                post
            });
        } else {
            const post = {
                title: data.get("title"),
                body: data.get("body"),
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

    const post = getPost(parseInt(id)) || {};

    return (
        <>
            <h2>Event</h2>
            <form action={handleSubmit}>
                <input type="hidden" name="id" defaultValue={post.id} />
                <div>
                    Title&nbsp;&nbsp;
                    <input type="text" name="title" defaultValue={post.title} />
                </div>
                <div>
                    Body&nbsp;&nbsp;
                    <textarea name="body" defaultValue={post.body}></textarea>
                </div>
                <div>
                    <input type="submit" />
                    <Link to="/events">Go back to events</Link>
                </div>
            </form>
        </>
    )
}