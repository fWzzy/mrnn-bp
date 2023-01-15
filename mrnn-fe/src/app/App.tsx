import { ListBook } from 'features/book/ListBook';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Login } from '../features/auth/Login';
import { Register } from '../features/auth/Register';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<AppLayout />}>
        <Route path="" element={<ListBook />} />
        <Route path="book" element={<ListBook />} />
      </Route>
    </Routes>
  );
}

export default App;
