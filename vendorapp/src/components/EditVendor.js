import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/createvendor.css";

export default function EditVendor() {
  const navigate = useNavigate();
  let [vendorname, setVendorname] = useState("");
  let [bank_acc_no, setBank_acc_no] = useState("");
  let [bank_name, setBank_name] = useState("");
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [country, setCountry] = useState("");
  let [zip_code, setZip_code] = useState("");
  let [cityProduct, SetCityProduct] = useState("");
  let [countryProduct, SetCountryProduct] = useState("");
  const location = useLocation();
  useEffect(() => {
    async function res() {
      await handleId();
      await handleCity();
      await handleCountry();
    }
    res();
  }, []);

  async function handleCity() {
    let result = await axios.get("http://localhost:4000/backend/showcity");
    console.log(result.data.records);
    SetCityProduct([...result.data.records]);
  }
  async function handleCountry() {
    let result = await axios.get("http://localhost:4000/backend/showcountry");
    console.log(result.data.records);
    SetCountryProduct([...result.data.records]);
  }

  async function handleId() {
    let idResult = await axios
      .post("http://localhost:4000/backend/idresult", {
        id: location.state.id,
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    if (idResult) {
      console.log(idResult.data.records[0]);
      // alert("Record inserted successfully");
      //   alert("Record has been filled");
      const vendor_data = idResult.data.records[0];
      setVendorname(vendor_data.vendorname); //--->mobile_num is database column name & also we again overwrite The used for incoming use
      setBank_acc_no(vendor_data.bank_acc_no);
      setBank_name(vendor_data.bank_name);
      setAddress(vendor_data.address);
      setCity(vendor_data.city);
      setCountry(vendor_data.country);
      setZip_code(vendor_data.zip_code);
    }
  }
  // console.log(location.state);
  // console.log(vendorname);

  async function handleUpdate(e) {
    e.preventDefault();
    let result = await axios
      .patch("http://localhost:4000/backend/update", {
        id: location.state.id,
        vendorname,
        bank_acc_no,
        bank_name,
        address,
        city,
        country,
        zip_code,
      })
      .catch((err) => {
        //here we applying an error condition to using a update so we using catch for This to handle an error issue
        // console.log(err.response.data);
        alert(err.response);
      });
    if (result) {
      console.log(result);
      alert("Record updated successfully");
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
      <form className="registration" onSubmit={handleUpdate}>
        <h1>Edit Vendor Details</h1>

        <label>
          <span>Vendor name</span>

          <input
            type="text"
            id="vendorname"
            value={vendorname}
            onChange={(e) => setVendorname(e.target.value)}
          />
        </label>

        <label>
          <span>Bank Account No.</span>

          <input
            type="number"
            id="number"
            value={bank_acc_no}
            onChange={(e) => setBank_acc_no(e.target.value)}
          />
        </label>

        <label>
          <span>Bank name</span>

          <input
            type="text"
            id="bankname"
            value={bank_name}
            onChange={(e) => setBank_name(e.target.value)}
          />
        </label>

        <label>
          <span>Address 1</span>
          <textarea
            id="address1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>Address 2</span>
          <textarea
            id="address2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </label>

        <label>
          <span>City</span>

          <select
            id="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          >
            {cityProduct.length !== 0 ? (
              cityProduct.map((ele, idx) => {
                return <option key={idx}>{ele.city}</option>;
              })
            ) : (
              <option>No data</option>
            )}
          </select>
        </label>

        <label>
          <span>Country</span>

          <select
            id="country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          >
            {countryProduct.length !== 0 ? (
              countryProduct.map((ele, idx) => {
                return <option key={idx}>{ele.country}</option>;
              })
            ) : (
              <option>No data</option>
            )}
          </select>
        </label>

        <label>
          <span>Zip-code</span>

          <input
            type="number"
            id="zipcode"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
          />
        </label>

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
