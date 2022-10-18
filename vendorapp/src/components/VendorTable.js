import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function VendorTable() {
  let [product,setProduct]=useState("");
  async function getData() {
    let result = await axios.get("http://localhost:4000/backend/show");
    // console.log(result.data.records);
    setProduct([...result.data.records]);
  }
  useEffect(()=>{
    async function res(){
      await getData();
    }
    res();
  },[])
  return (
    <div className="container">
    <div className='vendortable'>
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
                              <Td><button>Edit Vendor</button></Td>
                              <Td><button>Delete Vendor</button></Td>
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
  )
}
