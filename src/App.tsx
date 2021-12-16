import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { Users } from "./pages/Users";
import { Footer } from "./components/Footer";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
