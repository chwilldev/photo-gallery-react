import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import PhotoListPage from "./Pages/PhotoListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<PhotoListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
