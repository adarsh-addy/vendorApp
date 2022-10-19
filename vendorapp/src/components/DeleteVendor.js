import React, { useEffect, useState } from "react";
import "../styles/createvendor.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateVendor() {
  const navigate = useNavigate();
  let [vendorname, setVendorname] = useState("");
  let [bank_acc_no, setBank_acc_no] = useState("");
  let [bank_name, setBank_name] = useState("");
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [country, setCountry] = useState("");
  let [zip_code, setZip_code] = useState("");
  const location = useLocation();
  useEffect(() => {
    async function res() {
      await handleDeleteId();
    }
    res();
  }, []);

  async function handleDeleteId() {
    let idResult = await axios
      .post("http://localhost:4000/backend/idresult", {
        id: location.state.id,
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
      const vendor_data = idResult.data.records[0];
    if (vendor_data) {
      // console.log(idResult.data.records[0]);
      // alert("Record inserted successfully");
      //   alert("Record has been filled");
     
      setVendorname(vendor_data.vendorname); //--->mobile_num is database column name & also we again overwrite The used for incoming use
      setBank_acc_no(vendor_data.bank_acc_no);
      setBank_name(vendor_data.bank_name);
      setAddress(vendor_data.address);
      setCity(vendor_data.city);
      setCountry(vendor_data.country);
      setZip_code(vendor_data.zip_code);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    let result = await axios
      .delete("http://localhost:4000/backend/delete", {
       data:{id:location.state.id}
      })
      .catch((err) => {
        //here we applying an error condition to using a update so we using catch for This to handle an error issue
        // console.log(err.response.data);
        alert(err.response);
      });
    if (result) {
      console.log(result);
      alert("Record Deleted successfully");
      setVendorname("");
      setBank_acc_no("");
      setBank_name("");
      setAddress("");
      setCity("");
      setCountry("");
      setZip_code("");
      navigate("/table");
    }
  }

  return (
    <div className="container">
      <form className="registration" onSubmit={handleDelete}>
        <h1>Delete Vendor Details</h1>

        <label>
          <span>Vendor name</span>

          <input type="text" id="vendorname" value={vendorname} />
        </label>

        <label>
          <span>Bank Account No.</span>

          <input type="number" id="number" value={bank_acc_no} />
        </label>

        <label>
          <span>Bank name</span>

          <input type="text" id="bankname" value={bank_name} />
        </label>

        <label>
          <span>Address 1</span>
          <textarea id="address1" value={address}></textarea>
        </label>
        <label>
          <span>Address 2</span>
          <textarea id="address2" value={address}></textarea>
        </label>
        <label>
          <span>City</span>

          <input type="text" id="city" value={city} />
        </label>

        <label>
          <span>Country</span>

          <input type="text" id="country" value={country} />
        </label>

        <label>
          <span>Zip-code</span>

          <input type="number" id="zipcode" value={zip_code} />
        </label>

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
