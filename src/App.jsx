import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const NotFound = lazy(() => import("./pages/not-found"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<WorkDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
