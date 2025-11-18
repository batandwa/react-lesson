function removePost(posts, id) {
    const updatedPosts = [...posts].filter(post => post.id !== id);
    return updatedPosts;
    // setPosts(newPosts);
}

function getPost(posts, id) {
    // This is the wrong way to do this 
    // this data should be fetched using an API request.
    // The data contained in the posts value could be 
    // outdated.
    return posts.find((item) => item.id === id);
}

function addPost(posts, data) {
    const updatedPosts = [...posts];

    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        const item = posts[i];
        if (item.id >= newId) {
            newId = item.id + 1;
        }
    }
    updatedPosts.push({
        id: newId,
        title: data["title"],
        body: data["body"],
    });

    // setPosts(updatedPosts);
    return updatedPosts;
}

function updatePost(posts, id, data) {
    const updatedPosts = [...posts].map(item => {
        if (item.id == id) {
            item["title"] = data["title"];
            item["body"] = data["body"];
        }
        return item;
    });

    // setPosts(updatedPosts);
    return updatedPosts;
}

export function postReducer(posts, action) {
    switch (action.type) {
        case "initialise":
            return action.posts;

        case "added":
            return addPost(posts, action.post);

        case "removed":
            return removePost(posts, action.id);

        case "updated":
            return updatePost(posts, action.id, action.post);

        // case "get":
        //     return getPost(posts, action.id);
    }
}
