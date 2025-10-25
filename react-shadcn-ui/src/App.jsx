import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import UserSettings from "./pages/UserSettings"
import BoilerplatePage from "./pages/BoilerplatePage"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicOnlyRoute from "./components/PublicOnlyRoute"
import Layout from "./components/Layout"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <UserSettings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/boilerplate"
          element={
            <ProtectedRoute>
              <Layout>
                <BoilerplatePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/login" 
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } 
        />
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/register" 
          element={
            <PublicOnlyRoute>
              <RegisterAndLogout />
            </PublicOnlyRoute>
          } 
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App