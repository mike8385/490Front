import logo from './logo.png';
import myImage from './pinkcd.png';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Films from './pages/Films'
import Customer from './pages/Customer'
import { useState } from 'react';



function App() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count+1);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/customer" element={<Customer />} />
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;


