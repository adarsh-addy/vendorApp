import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";

export default function VendorTable() {
  const navigate=useNavigate();
  let [product, setProduct] = useState("");
  async function getData() {
    let result = await axios.get("http://localhost:4000/backend/show");
    // console.log(result.data.records);
    setProduct([...result.data.records]);
  }

  let [id, setId] = useState(""); //id value of the table
  console.log(id);
  async function handleEditId(idx) {
    setId(idx); //using This value for update query to need of id value
   navigate("/editvendor",{state:{id:idx}});
  }
  async function handleDeleteId(idx) {
    setId(idx); //using This value for update query to need of id value
    if( window.confirm("Are sure want to delete this")){
      let result = await axios
      .delete("http://localhost:4000/backend/delete", {
       data:{id:idx}
      })
      .catch((err) => {
        //here we applying an error condition to using a update so we using catch for This to handle an error issue
        // console.log(err.response.data);
        alert(err.response);
      });
    if (result) {
      console.log(result);
      await getData()
      // navigate("/deletevendor",{state:{id:idx}});
    }
    } 
  }

  useEffect(() => {
    async function res() {
      await getData();
    }
    res();
  }, []);
  return (
    <div className="container">
      <div className="vendortable">
        <h1> List of Vendors</h1>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Vendor Name</Th>
              <Th>Bank Account No.</Th>
              <Th>Bank Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product.length !== 0 ? (
              product.map((ele, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{ele.id}</Td>
                    <Td>{ele.vendorname}</Td>
                    <Td>{ele.bank_acc_no}</Td>
                    <Td>{ele.bank_name}</Td>
                    <Td>
                      <button  onClick={() => handleEditId(ele.id)}>Edit Vendor</button>
                    </Td>
                    <Td>
                      <button onClick={() => handleDeleteId(ele.id)}>Delete Vendor</button>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td>NO data</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}
