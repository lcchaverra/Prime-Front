import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";
import ProtectedRoute from "../utils/ProtectedRoute"
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Dashboard/Users";

function App() {

  return (
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path="/dashboard/users" element={ <ProtectedRoute> <Users /> </ProtectedRoute> } />

        {/* Rutas de error */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App
