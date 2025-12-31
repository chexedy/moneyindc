import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Groups, Scores, About } from "./pages";
import { Navbar } from "./components";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}