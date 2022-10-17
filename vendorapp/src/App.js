// import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Vendor from './components/CreateVendor'
import EditVendor from './components/EditVendor';
import DeleteVenor from './components/DeleteVendor'
import VendorTable from './components/VendorTable';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<Vendor/>} /> */}
        <Route path='/editvendor' element={<EditVendor/>} />
        <Route path='/deletevendor' element={<DeleteVenor/>} />
        {/* <Route path='/vendortable' components={<VendorTable/>} /> */}
      </Routes>
      <VendorTable/>  
    </div>
  );
}

export default App;
