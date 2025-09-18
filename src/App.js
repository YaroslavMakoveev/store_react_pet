import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product-page/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
