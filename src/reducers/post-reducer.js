/**
 * Reducer Functions for Post/Event Management
 *
 * This file contains a collection of "reducer" functions and a main `postReducer`
 * function. Reducers are pure functions that take the current state and an action,
 * and return a new state. They are a core part of Redux-like state management patterns
 * and are used with React's `useReducer` hook.
 *
 * Key Concepts:
 * 1. **Pure Functions**: Reducer functions must be pure. This means they should not
 *    modify the input state directly (no mutations), and they should not have side
 *    effects like API calls or logging. They simply calculate and return a new state.
 *    @see {@link https://redux.js.org/understanding/thinking-in-redux/three-principles#changes-are-made-with-pure-functions}
 * 2. **Immutability**: To avoid mutating the state directly, we often use techniques
 *    like the spread syntax (`...`) to create copies of arrays or objects before
 *    making changes.
 *    @see {@link https://react.dev/learn/updating-objects-in-state}
 * 3. **Action Object**: An "action" is a plain JavaScript object that describes
 *    "what happened." It typically has a `type` property (a string constant) and
 *    optionally a `payload` (e.g., `id`, `post`, `term`) containing the data needed
 *    to perform the state update.
 *    @see {@link https://redux.js.org/basics/actions}
 * 4. **Switch Statement**: The main `postReducer` function uses a `switch` statement
 *    on `action.type` to determine which specific update logic to apply.
 *
 * The individual helper functions (`removePost`, `addPost`, `updatePost`) encapsulate
 * the logic for specific state transitions, making the main reducer cleaner.
 */

/**
 * Removes a post from the posts array based on its ID.
 *
 * @param {Array<Object>} posts - The current array of posts.
 * @param {number|string} id - The ID of the post to remove.
 * @returns {Array<Object>} A new array with the specified post removed.
 */
function removePost(posts, id) {
    // Use the spread syntax `[...posts]` to create a shallow copy of the posts array.
    // This ensures we don't mutate the original state directly.
    // The `.filter()` method then creates a new array containing only the posts
    // whose ID does not match the one to be removed.
    const updatedPosts = [...posts].filter(post => post.id !== id);
    return updatedPosts;
    // In a component with `useState`, you would call `setPosts(newPosts)`.
    // In a reducer, you just return the new state.
}

// /**
//  * Retrieves a single post by its ID.
//  * NOTE: This function is commented out because fetching a single item from an
//  * already loaded list is generally not the responsibility of a reducer.
//  * This data should be fetched using an API request, especially if the data
//  * in the `posts` array could be outdated or incomplete.
//  *
//  * @param {Array<Object>} posts - The current array of posts.
//  * @param {number|string} id - The ID of the post to retrieve.
//  * @returns {Object|undefined} The found post object, or undefined if not found.
//  */
// function getPost(posts, id) {
//     // This is the wrong way to do this
//     // this data should be fetched using an API request.
//     // The data contained in the posts value could be
//     // outdated.
//     return posts.find((item) => item.id === id);
// }

/**
 * Fetches posts from an external API based on a search term.
 * NOTE: This function is an example of a side effect and is NOT a pure reducer function.
 * Reducers should not perform side effects like API calls. This logic would typically
 * be handled in a component's `useEffect` hook or a middleware like Redux Thunk.
 * The `postReducer`'s "search" case calling this is also problematic for the same reason.
 *
 * @param {string} term - The search term to query the API.
 * @returns {Promise<Array<Object>>} A promise that resolves to the array of search results.
 */
function search(term) {
    // This is an example of an API call, which is a side effect.
    // It should not be inside a reducer.
    fetch("https://hp-api.onrender.com/api/characters/students?q=" + term)
        .then(async (response) => {
            const data = await response.json();
            // In a component, you would use `setPosts(data.slice(0, 10));` to update the state.
            // A reducer cannot return a promise or handle asynchronous operations directly.
            return data;
        });
}

/**
 * Adds a new post to the posts array.
 *
 * @param {Array<Object>} posts - The current array of posts.
 * @param {Object} data - The data for the new post (e.g., name, ancestry).
 * @returns {Array<Object>} A new array including the new post.
 */
function addPost(posts, data) {
    // Create a copy of the posts array.
    const updatedPosts = [...posts];

    // Generate a new ID for the post. This logic finds the highest existing ID
    // and increments it by 1. This is a simple client-side ID generation strategy.
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        const item = posts[i];
        if (item.id >= newId) {
            newId = item.id + 1;
        }
    }

    // Add the new post object to the copied array.
    updatedPosts.push({
        id: newId,
        name: data["name"],
        ancestry: data["ancestry"],
    });

    // In a component, you would call `setPosts(updatedPosts);`.
    // Here, we return the new array.
    return updatedPosts;
}

/**
 * Updates an existing post in the posts array.
 *
 * @param {Array<Object>} posts - The current array of posts.
 * @param {number|string} id - The ID of the post to update.
 * @param {Object} data - The new data for the post (e.g., updated name, ancestry).
 * @returns {Array<Object>} A new array with the specified post updated.
 */
function updatePost(posts, id, data) {
    // Create a copy of the posts array.
    // Use `.map()` to iterate over the posts. If the item's ID matches the target ID,
    // create a new object for that item with the updated properties.
    // Otherwise, return the original item. This ensures immutability.
    const updatedPosts = [...posts].map(item => {
        if (item.id == id) { // Note: Using `==` for loose equality. `===` is generally preferred.
            // Create a new object for the item to be updated, spreading its old properties
            // and then overwriting with the new data. This is a robust way to update.
            // For simplicity, this example directly mutates `item` which is not ideal
            // if `item` was a more complex object or if other references to it existed.
            // A better approach would be: `return { ...item, name: data.name, ancestry: data.ancestry };`
            item["name"] = data["name"];
            item["ancestry"] = data["ancestry"];
        }
        return item; // Return the item (either updated or original).
    });

    // In a component, you would call `setPosts(updatedPosts);`.
    return updatedPosts;
}

/**
 * The main reducer function for managing posts.
 * This function is typically used with React's `useReducer` hook. It takes the
 * current `posts` state and an `action` object, and returns the new `posts` state.
 *
 * @param {Array<Object>} posts - The current state (array of posts).
 * @param {object} action - The action object describing the state change.
 * @returns {Array<Object>} The new state (array of posts).
 */
export function postReducer(posts, action) {
    // Use a switch statement to handle different action types.
    switch (action.type) {
        case "initialise":
            // This action type is used to set the initial state of posts,
            // often after fetching data from an API.
            // The new state is simply the `action.posts` payload.
            return action.posts;

        case "added":
            // When a new post is added, call the `addPost` helper function
            // with the current posts and the new post data from `action.post`.
            return addPost(posts, action.post);

        case "removed":
            // When a post is removed, call the `removePost` helper function
            // with the current posts and the ID of the post to remove from `action.id`.
            return removePost(posts, action.id);

        case "updated":
            // When a post is updated, call the `updatePost` helper function
            // with the current posts, the ID from `action.id`, and the new data from `action.post`.
            return updatePost(posts, action.id, action.post);

        case "search":
            // NOTE: This case is problematic. The `search` function performs an
            // asynchronous API call and does not return a new state array.
            // Reducers must be synchronous and return the new state.
            // This pattern should be avoided. Search results should be handled
            // by fetching data in a component and then dispatching an "initialise"
            // or "set_search_results" action with the fetched data.
            return search(action.term); // This will not work as expected with `useReducer`.

        // The "get" case is commented out because retrieving a single item
        // is not a state transition for the entire list and is better handled
        // by selecting from the existing state or fetching individual data.
        // case "get":
        //     return getPost(posts, action.id);

        // It's good practice to have a default case that returns the current state
        // if the action type is not recognized. This prevents unexpected errors.
        default:
            return posts;
    }
}
