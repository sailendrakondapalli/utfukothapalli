import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import './index.css';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={
          <>
            <Header />
            <main><Home /></main>
            <Footer />
          </>
        } />

        {/* Admin routes — no header/footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
