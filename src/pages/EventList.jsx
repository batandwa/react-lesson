import React, { useRef, useState } from "react";
import Item from "../components/Item";
import Navigation from "../components/Navigation";
import { useEvents } from "../context/EventsContext";
import { Link } from "react-router-dom";
import { Alert, Button, InputGroup } from "react-bootstrap"; // Bootstrap components for UI.

/**
 * EventList Page Component
 *
 * This component displays a list of events. It includes a search form to filter
 * the events and uses the Context API to access and manage the event data.
 * It also demonstrates the use of React hooks like `useState` and `useRef`.
 *
 * Key Concepts:
 * 1. **State Management with Context API**:
 *    - `useEvents`: A custom hook that provides access to the `posts` (events) array
 *      and the `dispatch` function from the `EventsContext`. This allows the component
 *      to display the list of events and potentially dispatch actions to modify them.
 *      @see {@link https://react.dev/learn/passing-data-deeply-with-context}
 * 2. **Local State Management with `useState`**:
 *    - `useState` is used to manage the `term` state, which stores the current
 *      search term entered by the user. This state is local to this component.
 *      @see {@link https://react.dev/learn/state-a-components-memory}
 * 3. **DOM Access with `useRef`**:
 *    - `useRef` is used to create a reference to the search input element (`searchTermRef`).
 *      This allows direct access to the DOM node, for example, to programmatically
 *      focus the input field after a search.
 *      @see {@link https://react.dev/learn/manipulating-the-dom-with-refs}
 * 4. **Routing with `react-router-dom`**:
 *    - `Link`: Component for client-side navigation. Here, it's used to navigate
 *      to the "Add Event" form (`/events/new`).
 *      @see {@link https://reactrouter.com/en/main/components/link}
 * 5. **Form Handling**:
 *    - A form is used for the search functionality. Its `action` attribute points
 *      to the `search` function, which receives a `FormData` object upon submission.
 *    - `FormData.get()` is used to extract the search term from the form data.
 *      @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData/get}
 * 6. **List Rendering and Filtering**:
 *    - The `posts` array is filtered based on the `term` state using the `.filter()` method.
 *    - The filtered array is then mapped over using `.map()` to render an `Item` component
 *      for each event. Each `Item` receives props like `key`, `text`, `title`, `itemId`, and `url`.
 *      @see {@link https://react.dev/learn/rendering-lists}
 * 7. **Conditional Rendering**: The component checks if `posts` exists. If it does,
 *    it renders the list and search form. Otherwise, it renders a "Nothin is here..." message.
 *    @see {@link https://react.dev/learn/conditional-rendering}
 * 8. **Third-Party Library (React-Bootstrap)**: The component uses pre-styled
 *    components like `Button` and `InputGroup` from `react-bootstrap` for a consistent look and feel.
 *    @see {@link https://react-bootstrap.github.io/}
 *
 * @returns {JSX.Element} The event list page, including a search form and a list of events.
 */
export default function EventList() {
    // Destructure `posts` (the array of events) and `dispatch` from the `useEvents` custom hook.
    const {posts, dispatch} = useEvents();

    // `useState` hook to manage the local state for the search term.
    // `term` holds the current search string, and `setTerm` is the function to update it.
    const [term, setTerm] = useState("");

    // `useRef` hook to create a reference to the search input DOM element.
    // This allows us to interact with the input directly, e.g., to focus it.
    const searchTermRef = useRef(null);

    /**
     * Handles the search form submission.
     * @param {FormData} data - The FormData object collected from the search form.
     */
    function search(data) {
        // Get the search term from the form data and convert it to lowercase for case-insensitive matching.
        const newTerm = data.get("term").toLowerCase();
        setTerm(newTerm);

        // Programmatically focus the search input field after the search is submitted.
        if (searchTermRef.current) {
            searchTermRef.current.focus();
        }

        // Example of how you might dispatch a search action to a reducer (commented out).
        // This would be useful if the search logic or filtered list needed to be
        // managed globally or if the search was more complex.
        // dispatch({
        //     type: "search",
        //     term: newTerm // Use the newTerm here, not the old `term` state.
        // });
    }

    // Conditional rendering: check if the `posts` array exists and is not empty.
    if(posts && posts.length > 0)
        return (
            <>
                {/* Search form.
                     The `action` attribute points to the `search` function.
                     When submitted, `search` will be called with a FormData object. */}
                <form action={search}>
                    {/* Bootstrap's form layout classes for styling. */}
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Search Event:</label>
                        {/* The search input field.
                             - `type="text"`: A standard text input.
                             - `className="form-control"`: Bootstrap class for styling.
                             - `placeholder="eg: Harry"`: Placeholder text.
                             - `name="term"`: Name of the input, used to retrieve its value in `FormData`.
                             - `defaultValue={term}`: Sets the initial value of the input to the current `term` state.
                             - `ref={searchTermRef}`: Attaches the ref to this input element. */}
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="eg: Harry" 
                            name="term" 
                            defaultValue={term} 
                            ref={searchTermRef} 
                        />
                    </div>
                    {/* Bootstrap's Button component for the submit button. */}
                    <Button type="submit" className="btn btn-primary">Search</Button>
                </form>

                {/* The Navigation component wraps the main content of the page.
                     It receives a `title` prop and `children` (the "Add Event" link and the list of items). */}
                <Navigation title="Main Menu!!">
                    {/* Link to navigate to the page for adding a new event. */}
                    <Link to="/events/new">Add Event</Link>

                    {/* Dynamically render the list of events. */}
                    {
                        posts
                            // Filter the posts based on the search term.
                            // It checks if the item's name (converted to lowercase) includes the search term.
                            .filter(item => {
                                return item.name.toLowerCase().includes(term);
                            })
                            // Map over the filtered array to create an `Item` component for each event.
                            .map(link => {
                                return (
                                    <Item 
                                        key={link.id}          // A unique key for each item in the list (important for React).
                                        text={link.name}        // The text to display for the item link.
                                        title={link.name}       // The title attribute for the item link.
                                        itemId={link.id}        // The ID of the item, used for edit/delete actions.
                                        url={`/events/${link.id}`} // The URL to navigate to when the item is clicked.
                                    />
                                );
                            })
                    }
                </Navigation>
            </>
        )
    else 
        // If `posts` is null, undefined, or an empty array, render this message.
        return (
            <p>Nothin is here...</p>
        )
}
