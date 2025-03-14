import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import myImage from './pinkcd.png';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Films from './pages/Films'
import Customer from './pages/Customer'
import CustomerCreate from './pages/customerCreate';
import { useState } from 'react';
import Update from './pages/Update'
import Info from './pages/Info'


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
            <Route path='/customer/create' element={<CustomerCreate/>}/>
            <Route path='/update/:id' element={<Update/>}></Route>
            <Route path='/info/:id' element={<Info/>}></Route>

          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;


