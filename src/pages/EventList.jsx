import React, { useRef, useState } from "react";
import Item from "../components/Item";
import Navigation from "../components/Navigation";
import { useEvents } from "../context/EventsContext";
import { Link } from "react-router-dom";
import { Alert, Button, InputGroup } from "react-bootstrap";

export default function EventList() {
    const {posts, dispatch} = useEvents();
    const [term, setTerm] = useState("");
    const searchTermRef = useRef(null);

    function search(data) {
        setTerm(data.get("term").toLowerCase());
        searchTermRef.current.focus();
        // dispatch({
        //     type: "search",
        //     term: term
        // });
    }

    if(posts)
        return (
            <>
                <form action={search}>
                    <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="text" class="form-control" placeholder="eg: Harry" name="term" defaultValue={term} ref={searchTermRef} />
                    </div>
                    <Button type="submit" class="btn btn-primary" value="Search">Search</Button>
                </form>
                <Navigation title="Main Menu!!">
                    <Link to="/events/new">Add Event</Link>
                    {
                        posts
                            .filter(item => {
                                return item.name.toLowerCase().includes(term);
                            })
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
