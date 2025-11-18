function removePost(posts, id) {
    const updatedPosts = [...posts].filter(post => post.id !== id);
    return updatedPosts;
    // setPosts(newPosts);
}

// function getPost(posts, id) {
//     // This is the wrong way to do this 
//     // this data should be fetched using an API request.
//     // The data contained in the posts value could be 
//     // outdated.
//     return posts.find((item) => item.id === id);
// }

function search(term) {
    fetch("https://hp-api.onrender.com/api/characters/students?q=" + term)
        .then(async (response) => {
            const data = await response.json(); 
            // setPosts(data.slice(0, 10));
            return data;
        });
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
        title: data["name"],
        body: data["ancestry"],
    });

    // setPosts(updatedPosts);
    return updatedPosts;
}

function updatePost(posts, id, data) {
    const updatedPosts = [...posts].map(item => {
        if (item.id == id) {
            item["name"] = data["name"];
            item["ancestry"] = data["ancestry"];
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

        case "search":
            return search(action.term);

        // case "get":
        //     return getPost(posts, action.id);
    }
}
