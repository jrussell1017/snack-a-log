import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Index from "./Components/Index";
import New from "./Components/New";
import Show from "./Components/Show";
import Edit from "./Components/Edit";
import FourOFour from "./Components/FourOFour";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snacks" element={<Index />} />
            <Route path="/snacks/new" element={<New />} />
            <Route exact path="/snacks/:id" element={<Show />} />
            <Route path="/snacks/:id/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
