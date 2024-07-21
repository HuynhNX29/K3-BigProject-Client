import { Routes, Route, Navigate, HashRouter, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          } />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      {/* </BrowserRouter> */}

    </div>
  );
}


export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to="/login" />
  }
}

export default App;
