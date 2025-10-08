import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";  
import CreateArticle from "./pages/CreateArticle";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import EditArticle from "./pages/EditArticle";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article/:id" element={<EditArticle />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Settings" element={<Settings />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
