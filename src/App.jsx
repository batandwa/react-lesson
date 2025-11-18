import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import EventList from './pages/EventList.jsx';
import EventForm from './pages/EventForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Event from './pages/Event.jsx';
import { EventsProvider } from './context/EventsContext.jsx';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <EventsProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<EventList />} />
                <Route path='/events' element={<EventList />} />
                <Route path='/events/new' element={<EventForm />} />
                <Route path='/events/:id' element={<Event />} />
                <Route path='/events/:id/edit' element={<EventForm />} />
              </Routes>
            </BrowserRouter>
          </EventsProvider>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
