import React from "react";
import Item from "../components/Item";
import Navigation from "../components/Navigation";
import { useEvents } from "../context/EventsContext";
import { Link } from "react-router-dom";

export default function EventList() {
    const {posts} = useEvents();

    if(posts && posts.length > 0)
    return (
        <Navigation title="Main Menu!!">
            <Link to="/events/new">Add Event</Link>
            {posts.map(link => {
                return (
                    <Item 
                        key={link.id} 
                        text={link.title} 
                        title={link.title} 
                        itemId={link.id}
                        url={`/events/${link.id}`}
                    />
                );
            })}
        </Navigation>
    )
    else 
        return (
            <p>Nothin is here...</p>
    )
}
