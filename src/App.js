import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Admin from './pages/Admin/Admin';
import TaskList from './components/TaskList';

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={currentUser && currentUser.isAdmin === false ? <Home /> : <Navigate to='/admin' />} />
        <Route path='/admin' element={currentUser && currentUser.isAdmin === true ? <Admin /> : <Navigate to='/login' />} />
        <Route path='/admin/:id' element={currentUser && currentUser.isAdmin === true ? <TaskList /> : <Navigate to='/login' />} />
        <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/register' element={!currentUser ? <Register /> : <Navigate to='/' />} />


      </Routes>
    </Router>
  );
}

export default App;
