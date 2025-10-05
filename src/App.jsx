import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WorkDetail } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<WorkDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
