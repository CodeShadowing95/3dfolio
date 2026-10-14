import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const NotFound = lazy(() => import("./pages/not-found"));
const CaseStudyCI = lazy(() => import("./pages/CaseStudyCI"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-primary" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<WorkDetail />} />
          <Route path="/etude-de-cas/build-ci" element={<CaseStudyCI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
