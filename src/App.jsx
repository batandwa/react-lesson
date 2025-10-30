import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EventList from './pages/EventList.jsx';
import EventForm from './pages/EventForm.jsx';
import Event from './pages/Event.jsx';
import { EventsProvider } from './context/EventsContext.jsx';

function App() {
  return (
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
  )
}

export default App;
