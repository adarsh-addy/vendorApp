// import logo from './logo.svg';
import './App.css';
import Vendor from './components/CreateVendor'
import EditVendor from './components/EditVendor';
import DeleteVenor from './components/DeleteVendor'
import VendorTable from './components/VendorTable';

function App() {
  return (
    <div className="App">
     <Vendor/>
     <EditVendor/>
     <DeleteVenor/>
     <VendorTable/>
    </div>
  );
}

export default App;
