import React, { useState } from "react";
import Item from "../components/Item";
import Navigation from "../components/Navigation";
import { useEvents } from "../context/EventsContext";
import { Link } from "react-router-dom";

export default function EventList() {
    const {posts, dispatch} = useEvents();
    const [term, setTerm] = useState("");

    function search(data) {
        setTerm(data.get("term").toLowerCase());
        // dispatch({
        //     type: "search",
        //     term: term
        // });
    }

    if(posts && posts.length > 0)
    return (
        <>
            <form action={search}>
                <input type="text" name="term" defaultValue={term} />
                <input type="submit" value="Search" />
            </form>
            <Navigation title="Main Menu!!">
                <Link to="/events/new">Add Event</Link>
                {
                    posts
                        .filter(item => item.name.toLowerCase().includes(term))
                        .map(link => {
                            return (
                                <Item 
                                    key={link.id} 
                                    text={link.name} 
                                    title={link.name} 
                                    itemId={link.id}
                                    url={`/events/${link.id}`}
                                />
                            );
                        })
                }
            </Navigation>
        </>
    )
    else 
        return (
            <p>Nothin is here...</p>
    )
}
