// Import necessary components from 'react-router-dom' for handling routing in the application.
// - BrowserRouter: A router that uses the HTML5 history API to keep your UI in sync with the URL.
// - Route: Renders a specific UI component when its path matches the current URL.
// - Routes: A container for a nested tree of <Route> elements. It renders the first <Route> that matches the current URL.
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// This line is commented out, but it's typically used to import global CSS styles for the App component.
// import './App.css';

// Import the page components that will be rendered for different routes.
// These are the "views" or "pages" of our single-page application (SPA).
import EventList from './pages/EventList.jsx'; // Component for displaying a list of events.
import EventForm from './pages/EventForm.jsx'; // Component for creating or editing an event.
import Event from './pages/Event.jsx'; // Component for displaying details of a single event.

// Import Bootstrap CSS for styling.
// Bootstrap is a popular CSS framework that provides pre-built components and a responsive grid system.
// This line makes all of Bootstrap's styles available throughout the app.
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the EventsProvider from our custom context.
// Context in React provides a way to pass data through the component tree without having to pass props down manually at every level.
// EventsProvider will make event-related data and functions available to any component within it.
import { EventsProvider } from './context/EventsContext.jsx';

// Import layout components from 'react-bootstrap'.
// These are Bootstrap components adapted for React, making it easy to create responsive layouts.
// - Container: A fixed-width container for your content, providing padding and horizontal centering.
// - Row: A horizontal container for columns. It's part of Bootstrap's grid system.
// - Col: A column component that defines the width and behavior of a column within a row.
import { Col, Container, Row } from 'react-bootstrap';

// Define the main App component.
// This is the root component of our React application. All other components are rendered within this component or its children.
function App() {
  // The App component returns the JSX (JavaScript XML) that defines the structure of our application.
  // JSX is a syntax extension for JavaScript that looks similar to HTML and is used to describe what the UI should look like.
  return (
    // Use the Bootstrap Container component to wrap the entire application content.
    // It ensures the content is centered and has appropriate padding on different screen sizes.
    <Container>
      {/* Use the Bootstrap Row component to create a horizontal row for layout. */}
      <Row>
        {/* Use the Bootstrap Col component to create a column that takes up the full width of the row by default. */}
        <Col>
          {/* Wrap the entire application with the EventsProvider. */}
          {/* This makes the event data (like the list of events, functions to add/update/delete events) */}
          {/* available to any component inside the App that needs it, without prop drilling. */}
          <EventsProvider>
            {/* BrowserRouter enables client-side routing. */}
            {/* It uses the browser's History API to update the URL and render the corresponding component */}
            {/* without a full page reload, which is typical for Single Page Applications (SPAs). */}
            <BrowserRouter>
              {/* The Routes component is a container for all our individual Route definitions. */}
              {/* It looks through all its children Route elements and renders the first one */}
              {/* whose 'path' matches the current URL. */}
              <Routes>
                {/* Define a Route for the home page ('/'). */}
                {/* When the URL is exactly 'http://localhost:5173/' (or your app's domain), */}
                {/* it will render the EventList component. */}
                <Route path='/' element={<EventList />} />

                {/* Define a Route for the '/events' path. */}
                {/* When the URL is 'http://localhost:5173/events', */}
                {/* it will also render the EventList component, showing all events. */}
                <Route path='/events' element={<EventList />} />

                {/* Define a Route for creating a new event ('/events/new'). */}
                {/* When the URL is 'http://localhost:5173/events/new', */}
                {/* it will render the EventForm component, likely with a form to add a new event. */}
                <Route path='/events/new' element={<EventForm />} />

                {/* Define a Route for viewing a single event ('/events/:id'). */}
                {/* The ':id' part is a URL parameter. It's a placeholder for a dynamic value, */}
                {/* like an event's unique ID (e.g., '/events/123' or '/events/abc-def'). */}
                {/* The Event component will be rendered and can access this ID to fetch and display the specific event's details. */}
                <Route path='/events/:id' element={<Event />} />

                {/* Define a Route for editing an existing event ('/events/:id/edit'). */}
                {/* This path also uses the ':id' parameter to specify which event to edit. */}
                {/* It renders the EventForm component, which can be configured to handle editing based on the ID. */}
                <Route path='/events/:id/edit' element={<EventForm />} />
              </Routes>
            </BrowserRouter>
          </EventsProvider>
        </Col>
      </Row>
    </Container>
  );
}

// Export the App component as the default export of this file.
// This makes it available for import in other files, most importantly 'src/main.jsx',
// where it is typically rendered into the DOM (Document Object Model).
export default App;
