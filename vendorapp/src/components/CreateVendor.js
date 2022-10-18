import React, { useEffect, useState } from "react";
import "../styles/createvendor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateVendor() {
  const navigate = useNavigate();
  let [cityProduct, SetCityProduct] = useState("");
  let [countryProduct, SetCountryProduct] = useState("");
  let [vendorname, SetVendorname] = useState("");
  let [bank_acc_no, SetBank_acc_no] = useState("");
  let [bank_name, SetBank_name] = useState("");
  let [address, SetAddress] = useState("");
  let [city, SetCity] = useState("");
  let [country, SetCountry] = useState("");
  let [zip_code, SetZip_code] = useState("");
  console.log(vendorname);
  console.log(bank_acc_no);
  console.log(bank_name);
  console.log(address);
  console.log(city);
  console.log(country);
  console.log(zip_code);

  async function handleSave(e) {
    e.preventDefault();
    const resp = await axios
      .post("http://localhost:4000/backend/save", {
        vendorname,
        bank_acc_no,
        bank_name,
        address,
        city,
        country,
        zip_code,
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    if (resp) {
      console.log(resp.data);
      alert("Record inserted successfully");
      navigate("/table");
    }
    SetVendorname("");
    SetBank_acc_no("");
    SetBank_name("");
    SetAddress("");
    SetCity("");
    SetCountry("");
    SetZip_code("");
  }

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
  useEffect(() => {
    async function res() {
      await handleCity();
      await handleCountry();
    }
    res();
  }, []);
  return (
    <div className="container">
      <form className="registration">
        <h1>Vendor Form</h1>

        <label>
          <span>Vendor name</span>

          <input
            type="text"
            id="vendorname"
            onChange={(e) => SetVendorname(e.target.value)}
            required
          />

          <ul className="input-requirements">
            <li>At least 3 characters long</li>
            <li>
              Must only contain letters and numbers (no special characters)
            </li>
          </ul>
        </label>

        <label>
          <span>Bank Account No.</span>

          <input
            type="number"
            id="number"
            onChange={(e) => SetBank_acc_no(e.target.value)}
            required
          />

          <ul className="input-requirements">
            <li>At least 8 characters long (and less than 100 characters)</li>
            <li>Contains at least 1 number</li>
            <li>Contains at least 1 lowercase letter</li>
            <li>Contains at least 1 uppercase letter</li>
            <li>Contains a special character (e.g. @ !)</li>
          </ul>
        </label>

        <label>
          <span>Bank name</span>

          <input
            type="text"
            id="bankname"
            onChange={(e) => SetBank_name(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Address 1</span>
          <textarea
            id="address1"
            onChange={(e) => SetAddress(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>Address 2</span>
          <textarea
            id="address2"
            onChange={(e) => SetAddress(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>City</span>

          <select id="city" onChange={(e) => SetCity(e.target.value)}>
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

          <select id="country" onChange={(e) => SetCountry(e.target.value)}>
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
            onChange={(e) => SetZip_code(e.target.value)}
            required
          />
        </label>

        <br />

        <input type="submit" onClick={handleSave} />
      </form>
    </div>
  );
}
