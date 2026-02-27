import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterLayout from "./layout/MasterLayout.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import BrandPage from "./pages/BrandPage.jsx";
import UomPage from "./pages/UomPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="/" element={<>Dashboard Page</>} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/uom" element={<UomPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Route>

        {/* fallback route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <div className="parent">
        <div className="child"></div>
        <div className="child"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
