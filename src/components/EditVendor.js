import React from "react";
import '../styles/createvendor.css';

export default function EditVendor() {
  return (
    <div className="container">
      <form className="registration">
        <h1>Edit Vendor Details</h1>

        <label>
          <span>Vendor name</span>

          <input type="text" id="vendorname"  required />

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

          <input type="text" id="bankname"  required />
          </label>

        <label>
          <span>Address 1</span>
          <textarea placeholder="Enter your Permanent address" id="address1"></textarea>
        </label>
        <label>
          <span>Address 2</span>
          <textarea placeholder="Enter your Corresponding address" id="address2"></textarea>
        </label>
        <label>
          <span>City</span>

          <select id="cars">
  <option value="volvo">Noida</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
          </label>

          <label>
          <span>Country</span>

          <select id="cars">
  <option value="volvo">USA</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
          </label>

          <label>
          <span>Zip-code</span>

          <input type="number" id="zipcode"  required />
          </label>

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
