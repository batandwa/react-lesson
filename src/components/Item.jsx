import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import CustomLink from "./Link";

export default function Item(props) {
    const {removePost} = useEvents();
    return (
        <li>
            <CustomLink url={props.url} title={props.title}>
                {props.text}
            </CustomLink>
            &nbsp;&nbsp;&nbsp;
            <Link to={`/events/${props.itemId}/edit`}>Edit</Link>
            &nbsp;&nbsp;&nbsp;
            <a href="#" onClick={() => removePost(props.itemId)}>Delete</a>
        </li>
    );
}
