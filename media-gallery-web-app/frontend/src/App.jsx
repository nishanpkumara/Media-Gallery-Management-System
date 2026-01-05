import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Gallery from './pages/MediaGallery';
// import Login from './pages/Login';
import Register from './pages/Register';
// import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Gallery />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;