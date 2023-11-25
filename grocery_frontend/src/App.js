import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages";
import { Home } from "./pages";
import { Header } from "./components";
import { ProductDetails } from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
