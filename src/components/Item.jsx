import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import CustomLink from "./Link";

/**
 * Item Component
 *
 * This functional component represents a single item in a list, likely an event item.
 * It displays the item's text as a clickable link, along with "Edit" and "Delete" buttons.
 *
 * Props:
 * - `itemId` (string|number): The unique identifier for the item. Used for editing and deleting.
 * - `text` (string): The text content to display for the item's main link.
 * - `title` (string): The title attribute for the main link (useful for accessibility and tooltips).
 * - `url` (string): The URL the main link should navigate to.
 *
 * This component demonstrates several key React concepts:
 * 1. **Custom Hooks (`useEvents`)**: It uses a custom hook `useEvents` to access the `dispatch`
 *    function from the EventsContext. This is part of React's Context API, which allows
 *    components to consume context without prop drilling.
 *    @see {@link https://react.dev/learn/passing-data-deeply-with-context}
 * 2. **Routing (`Link` from `react-router-dom`)**: It uses the `Link` component from
 *    React Router for client-side navigation to the edit page. This prevents full page reloads.
 *    @see {@link https://reactrouter.com/en/main/components/link}
 * 3. **Event Handling**: The "Delete" link has an `onClick` handler that dispatches a "removed"
 *    action to the context's reducer. This is a common pattern in state management, especially
 *    with useReducer or Redux-like patterns.
 *    @see {@link https://react.dev/learn/extracting-state-logic-into-a-reducer}
 *
 * @param {object} props - The properties passed to the component.
 * @param {string|number} props.itemId - The unique ID of the item.
 * @param {string} props.text - The display text for the item.
 * @param {string} props.title - The title attribute for the item's link.
 * @param {string} props.url - The URL for the item's link.
 * @returns {JSX.Element} A list item element containing links for viewing, editing, and deleting.
 */
export default function Item(props) {
    // Destructure the `dispatch` function from the `useEvents` custom hook.
    // `dispatch` is used to send actions to the state reducer, which will update
    // the application's state (e.g., removing an event).
    const { dispatch} = useEvents();

    return (
        <li>
            {/* CustomLink component for the main item link.
                It receives `url`, `title`, and `children` (props.text) as props. */}
            <CustomLink url={props.url} title={props.title}>
                {props.text}
            </CustomLink>
            {/* Non-breaking spaces for visual separation between links. */}
            &nbsp;&nbsp;&nbsp;
            {/* React Router's Link component for navigation to the edit page.
                The `to` prop specifies the destination URL, dynamically constructed
                using the item's ID. */}
            <Link to={`/events/${props.itemId}/edit`}>Edit</Link>
            &nbsp;&nbsp;&nbsp;
            {/* A standard anchor tag for the delete functionality.
                The `href="#"` is a common placeholder for links that trigger JavaScript actions.
                The `onClick` handler dispatches a "removed" action with the item's ID
                to the context's reducer, which will handle the state update for deletion. */}
            <a href="#" onClick={() => dispatch({type: "removed", id: props.itemId})}>Delete</a>
        </li>
    );
}
