
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import PublisherLogin from './pages/PublisherLogin';
import SubscriberLogin from './pages/SubscriberLogin';
import SubscriberMessages from './pages/SubscriberMessages';

function App() {
  return (
    // <div className="App">
    //   <Login />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/publisher" element={<PublisherLogin />}></Route>
        <Route path="/subscriber" element={<SubscriberLogin />}></Route>
        <Route path="/subscriber/messages" element={<SubscriberMessages />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
