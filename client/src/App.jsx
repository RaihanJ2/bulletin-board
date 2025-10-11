import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EditArticle from "./pages/EditArticle";
import { AuthProvider } from "./context/authProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import ResetPassword from "./pages/ResetPassword";
import History from "./pages/History";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  {" "}
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-article/:id"
              element={
                <ProtectedRoute>
                  <EditArticle />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
