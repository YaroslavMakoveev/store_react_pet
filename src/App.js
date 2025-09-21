import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router basename="/store_react_pet/">
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product-page/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
