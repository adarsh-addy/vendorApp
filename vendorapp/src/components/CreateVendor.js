import React, { useEffect, useState } from "react";
import "../styles/createvendor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function CreateVendor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let [cityProduct, SetCityProduct] = useState("");
  let [countryProduct, SetCountryProduct] = useState("");
  async function handleSave(data) {
    let payload = { ...data, address: data.address1 + " " + data.address2 };
    console.log(payload);
    const resp = await axios
      .post("http://localhost:4000/backend/save", payload)
      .catch((err) => {
        alert(err.response.data.message);
      });
    if (resp) {
      console.log(resp.data);
      alert("Record inserted successfully");
      navigate("/table");
    }
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
      <form className="registration" onSubmit={handleSubmit(handleSave)}>
        <h1>Vendor Form</h1>

        <label>
          <span>Vendor name</span>

          <input
            type="text"
            id="vendorname"
            {...register("vendorname", { required: true })}
          />
          {errors.vendorname && <p>Please check the Vendor Name</p>}
        </label>

        <label>
          <span>Bank Account No.</span>

          <input
            type="number"
            id="number"
            {...register("bank_acc_no", { required: true })}
          />
          {errors.bank_acc_no && <p>Please check the Bank Acc. No.</p>}
        </label>

        <label>
          <span>Bank name</span>

          <input
            type="text"
            id="bankname"
            {...register("bank_name", { required: true })}
          />
          {errors.bank_name && <p>Please check the Bank Name.</p>}
        </label>

        <label>
          <span>Address 1</span>
          <textarea
            id="address1"
            {...register("address1", { required: true })}
          ></textarea>
          {errors.address1 && <p>Please check the Address1.</p>}
        </label>
        <label>
          <span>Address 2</span>
          <textarea
            id="address2"
            {...register("address2", { required: true })}
          ></textarea>
          {errors.address2 && <p>Please check the Address2.</p>}
        </label>
        <label>
          <span>City</span>

          <select id="city" {...register("city", { required: true })}>
            {cityProduct.length !== 0 ? (
              cityProduct.map((ele, idx) => {
                return <option key={idx}>{ele.city}</option>;
              })
            ) : (
              <option>No data</option>
            )}
          </select>
          {errors.city && <p>Please check the City.</p>}
        </label>

        <label>
          <span>Country</span>

          <select id="country" {...register("country", { required: true })}>
            {countryProduct.length !== 0 ? (
              countryProduct.map((ele, idx) => {
                return <option key={idx}>{ele.country}</option>;
              })
            ) : (
              <option>No data</option>
            )}
          </select>
          {errors.country && <p>Please check the Country.</p>}
        </label>

        <label>
          <span>Zip-code</span>

          <input
            type="number"
            id="zipcode"
            {...register("zip_code", { required: true })}
          />
          {errors.zip_code && <p>Please check the Zip Code.</p>}
        </label>

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
