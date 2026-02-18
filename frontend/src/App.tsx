import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '@components/Navbar/Navbar';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Alerts from './pages/Alerts';
import Companies from './pages/Companies';

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/companies" element={<Companies />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;