import React, { useEffect, useState } from 'react';
import './CustomerComponent.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
    baseURL: 'http://localhost/web_service', 
  });
  
const CustomerTable = () => {
    
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);
  
  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      toast.success('Customers fetched from the database!');
      setRows(response.data);
    } catch (error) {
        toast.error('Error fetching customers.')
    }
  };

  const [newRow, setNewRow] = useState({ id: '', name: '', mobileNumber: '', address: '' });
  const [prevRow, setPrevRow] = useState({ id: '', name: '', mobileNumber: '', address: '' });
  const [editRowId, setEditRowId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const handleAddRow = async () => {
    if (newRow.name && newRow.mobileNumber && newRow.address) {
      if (editRowId) {
        const final = {};
        if(prevRow.name !== newRow.name)
          final.name = newRow.name;
        if(prevRow.address !== newRow.address)
          final.address = newRow.address;
        if(prevRow.mobileNumber !== newRow.mobileNumber)
          final.mobileNumber = newRow.mobileNumber;
        try {
          await api.put(`/customers/${editRowId}`, final);
          setRows((prevRows) =>
            prevRows.map((row) => (row._id === editRowId ? { ...newRow, _id: editRowId } : row))
          );
          toast.success('Customer have been edited !');
          setEditRowId('');
        } catch (error) {
            toast.error('Error updating customer !');
        }
      } else {
        try {
          const response = await api.post('/customers', newRow);
          setRows((prevRows) => {
            return [...prevRows, response.data.data]
          });
          toast.success('Customer have been added !');
        } catch (error) {
          toast.error('Error adding customer !');
        }
      }
      setNewRow({ id: '', name: '', mobileNumber: '', address: '' });
    }
  };

  const handleEditRow = (id) => {
    const rowToEdit = rows.find((row) => row._id === id);
    if (rowToEdit) {
      setEditRowId(id);
      setPrevRow({ ...rowToEdit });
      setNewRow({ ...rowToEdit });
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      toast.success('Customer have been deleted !');
    } catch (error) {
      toast.error('Error deleting customer !');
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>+{row.mobileNumber}</td>
              <td>{row.address}</td>
              <td>
                <button onClick={() => handleEditRow(row._id)}>Edit</button>
                <button onClick={() => handleDeleteRow(row._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='input-handler'>
        <input type="text" name="name" placeholder="Name" value={newRow.name} onChange={handleInputChange} />
        <input type="number" name="mobileNumber" placeholder="Mobile Number" value={newRow.mobileNumber} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Address" value={newRow.address} onChange={handleInputChange} />
        <button onClick={handleAddRow}>{editRowId ? 'Update' : 'Add'}</button>
      </div>
    </div>
  );
};    

export default CustomerTable;
