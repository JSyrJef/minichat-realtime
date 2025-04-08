import './assets/css/App.css'
import { auth } from './firebase/config'
import { Chats } from './pages/chats/Chats'
import { Login } from './pages/login/Login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './assets/css/Chat.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import './assets/css/tailwind.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/minichat-realtime/' element={user ? <Navigate to="/minichat-realtime/chat" /> : <Login />} />
        <Route path="/minichat-realtime/chat" element={user ? <Chats /> : <Navigate to="/minichat-realtime/" />} />
      </Routes>
    </Router>
  )
}

export default App
