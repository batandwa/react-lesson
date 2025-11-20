import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

/**
 * EventForm Page Component
 *
 * This component renders a form for creating a new event or editing an existing one.
 * It demonstrates handling form data, conditional logic for adding vs. updating,
 * and integrating with global state management via Context API.
 *
 * Key Concepts:
 * 1. **Routing with `react-router-dom`**:
 *    - `useParams`: Extracts the `id` from the URL. If an `id` is present,
 *      the form is in "edit mode" for an existing event. Otherwise, it's in "create mode".
 *      @see {@link https://reactrouter.com/en/main/hooks/use-params}
 *    - `useNavigate`: Provides a function to programmatically navigate to different routes.
 *      Here, it's used to redirect to the `/events` list page after a successful form submission.
 *      @see {@link https://reactrouter.com/en/main/hooks/use-navigate}
 *    - `Link`: Used for client-side navigation, allowing the user to go back to the
 *      events list without submitting the form.
 *      @see {@link https://reactrouter.com/en/main/components/link}
 * 2. **State Management with Context API**:
 *    - `useEvents`: A custom hook that provides access to the `posts` state and
 *      the `dispatch` function from the `EventsContext`. This allows the component
 *      to read the list of posts and send actions to modify them.
 *      @see {@link https://react.dev/learn/passing-data-deeply-with-context}
 * 3. **Form Handling**:
 *    - The form uses the native `action` attribute, pointing to the `handleSubmit` function.
 *      When the form is submitted, the browser automatically collects the form data
 *      and passes it as a `FormData` object to the handler.
 *    - `FormData.get()` is used to retrieve the values of individual form fields by their `name`.
 *      @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData/get}
 * 4. **Conditional Logic (Add vs. Update)**:
 *    - The `handleSubmit` function checks if the form data contains an `id`.
 *      - If no `id`, it dispatches an "added" action to create a new post.
 *      - If an `id` exists, it dispatches an "updated" action to modify an existing post.
 * 5. **Populating Form for Editing**:
 *    - If an `id` is present in the URL, the component finds the corresponding post
 *      from the `posts` array. The `defaultValue` attribute of the input fields is
 *      then used to pre-populate the form with the existing post's data.
 *      @see {@link https://react.dev/learn/forms#controlled-components}
 *      (Note: This uses `defaultValue` for uncontrolled components, which is fine for this example.
 *       For more complex forms, controlled components with `value` and `onChange` are often preferred.)
 *
 * @returns {JSX.Element} The event creation/editing form.
 */
export default function EventForm() {
    // Destructure `posts` (the array of events) and `dispatch` (the function to update state)
    // from the `useEvents` custom hook.
    const {posts, dispatch} = useEvents();

    // `useNavigate` hook returns a function that lets you navigate programmatically.
    const navigate = useNavigate();

    // `useParams` hook extracts the `id` parameter from the URL (e.g., from `/events/:id/edit`).
    // If the URL is just `/events/new`, `id` will be `undefined`.
    const {id} = useParams();

    /**
     * Handles the form submission for both creating and updating events.
     * @param {FormData} data - The FormData object collected from the form upon submission.
     */
    function handleSubmit(data) {
        // Check if the form data contains an "id" field.
        // If not, it means we are creating a new event.
        if(!data.get("id")) {
            // Construct a new post object from the form data.
            const post = {
                name: data.get("name"),
                ancestry: data.get("ancestry"),
                // A new `id` would typically be generated here or by the reducer.
                // For simplicity, this example assumes the reducer handles ID generation.
            };
            // Dispatch an "added" action to the context's reducer.
            // This action will be handled by `postReducer` to add the new post to the `posts` array.
            dispatch({
                type: "added",
                post
            });
        } else {
            // If an "id" is present, we are updating an existing event.
            const post = {
                name: data.get("name"),
                ancestry: data.get("ancestry"),
            };
            // Dispatch an "updated" action to the context's reducer.
            // This action includes the `id` of the post to update and the new `post` data.
            dispatch({
                type: "updated",
                id: data.get("id"), // The ID of the post to update.
                post                // The updated data for the post.
            });
        }
        // After successfully adding or updating, navigate the user to the events list page.
        navigate("/events");
    }

    // Find the existing post data if an `id` is provided in the URL.
    // This is used to pre-populate the form fields when editing.
    // `parseInt(id)` is used because URL parameters are strings, and IDs are likely numbers.
    // The nullish coalescing operator `?? {}` ensures that if no post is found (e.g., invalid ID),
    // `post` defaults to an empty object to prevent errors when accessing `post.name` or `post.ancestry`.
    const post = posts.find((item) => item.id === parseInt(id)) ?? {};

    return (
        <>
            <h2>Event</h2>
            {/* The form's `action` attribute is set to our `handleSubmit` function.
                 When the form is submitted, `handleSubmit` will be called with a FormData object. */}
            <form action={handleSubmit}>
                {/* A hidden input field to store the ID of the post being edited.
                     This is crucial for distinguishing between "add" and "update" modes.
                     `defaultValue` is used to set its initial value if an existing post is being edited. */}
                <input type="hidden" name="id" defaultValue={post.id} />
                <div>
                    Name&nbsp;&nbsp;
                    {/* Text input for the event's name.
                         `defaultValue` pre-fills the input if an existing post's name is available. */}
                    <input type="text" name="name" defaultValue={post.name} />
                </div>
                <div>
                    Ancestry&nbsp;&nbsp;
                    {/* Text input for the event's ancestry.
                         `defaultValue` pre-fills the input if an existing post's ancestry is available. */}
                    <input type="text" name="ancestry" defaultValue={post.ancestry} />
                </div>
                <div>
                    {/* Submit button to save the event (either add new or update existing). */}
                    <input type="submit" />
                    {/* Link to navigate back to the events list page without submitting the form. */}
                    <Link to="/events">Go back to events</Link>
                </div>
            </form>
        </>
    )
}
