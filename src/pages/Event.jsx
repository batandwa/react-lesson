import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * Event Page Component
 *
 * This component represents a page that displays the details of a single event (or post).
 * It fetches data from an external API based on an ID from the URL and displays it.
 *
 * Key Concepts:
 * 1. **Routing with `react-router-dom`**:
 *    - `useParams`: This hook is used to access the dynamic parameters from the current URL.
 *      In this case, it extracts the `id` of the event from the route (e.g., `/events/123`).
 *      @see {@link https://reactrouter.com/en/main/hooks/use-params}
 *    - `Link`: This component is used for client-side navigation. Clicking this link
 *      will navigate to the specified route (`/` in this case) without a full page reload.
 *      @see {@link https://reactrouter.com/en/main/components/link}
 * 2. **Data Fetching with `useEffect` and `useState`**:
 *    - `useState`: This hook is used to manage the component's local state. Here, `post`
 *      holds the fetched event data, and `setPost` is used to update it.
 *      @see {@link https://react.dev/learn/state-a-components-memory}
 *    - `useEffect`: This hook is used to perform side effects, such as data fetching.
 *      The effect runs when the component mounts and whenever the `id` or `post` dependency changes.
 *      @see {@link https://react.dev/learn/synchronizing-with-effects#fetching-data}
 * 3. **Conditional Rendering**: The component renders different JSX based on whether
 *    the `post` data has been fetched. If `post` is null/undefined, it shows a
 *    "Loading..." message. Otherwise, it displays the post details.
 *    @see {@link https://react.dev/learn/conditional-rendering}
 * 4. **API Fetching**: The native `fetch` API is used to retrieve data from
 *    `https://jsonplaceholder.typicode.com/posts/${id}`. This is a common way to
 *    interact with REST APIs in React.
 *    @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API}
 *
 * @returns {JSX.Element} The event details page, showing either a loading message or the event data.
 */
export default function Event() {
    // `useState` is used to store the fetched post data.
    // It's initialized as `undefined` because we don't have the data yet.
    const [post, setPost] = useState();

    // `useParams` hook from `react-router-dom` extracts the dynamic `id`
    // from the URL (e.g., if the route is `/events/:id`, and the URL is `/events/1`, `id` will be "1").
    const {id} = useParams();

    // `useEffect` hook is used to fetch data from the API.
    // The effect will run after the component renders and whenever `id` or `post` changes.
    useEffect(() => {
        // Fetch data from the JSONPlaceholder API using the `id` from the URL.
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(async (response) => {
                // Convert the response to JSON.
                const data = await response.json();
                // Update the `post` state with the fetched data, which will cause a re-render.
                setPost(data);
            })
            // It's good practice to add a `.catch` block to handle potential errors during fetching.
            .catch(error => {
                console.error("Failed to fetch event:", error);
                // Optionally, set an error state to display to the user.
            });
    }, [id, post]); // Dependency array: the effect re-runs if `id` or `post` changes.
                   // Note: Including `post` in the dependency array here might cause an infinite loop
                   // if the API always returns a new object reference. A better approach might be to
                   // remove `post` and manage loading/error states more explicitly, or use a library
                   // like React Query for more robust data fetching. However, for this example,
                   // it demonstrates a common (though potentially problematic) pattern.

    // Conditional rendering based on whether the `post` data has been fetched.
    if(post)
        // If `post` is not null/undefined, render the event details.
        return (
            <>
                <h2>{post.title}</h2> {/* Display the post's title. */}
                <p>{post.body}</p>   {/* Display the post's body/content. */}
                <hr />               {/* A horizontal rule for visual separation. */}
                {/* A link to navigate back to the home page (`/`). */}
                <Link to="/">Go back home</Link>
            </>
        );
    else
        // If `post` is still `undefined` (data hasn't been fetched yet), render a loading message.
        return (
            <div>
                Loading details for event {id}
            </div>
        );
}
