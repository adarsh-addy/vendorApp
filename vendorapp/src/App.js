// import logo from './logo.svg';
import './App.css';
import React from "react";
import {Routes,Route} from 'react-router-dom'
import Vendor from './components/CreateVendor'
import EditVendor from './components/EditVendor';
// import DeleteVenor from './components/DeleteVendor'
import VendorTable from './components/VendorTable';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Vendor/>} />
        <Route path='/editvendor' element={<EditVendor/>} />
        {/* <Route path='/deletevendor' element={<DeleteVendor/>} /> */}
        <Route path='/table' element={<VendorTable/>} />
      </Routes>
    </div>
  );
}

export default App;
