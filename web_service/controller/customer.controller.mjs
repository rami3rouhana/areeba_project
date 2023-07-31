import Customer from '../models/customer.model.mjs';
import axios from 'axios';

const validatePhoneNumber = async(number) =>{
  try {
    const validateNumber = await axios.get(process.env.MICROSERVICE_BASE_URL + number);
    return validateNumber.data.valid;
  } catch (error){
    return false;
  }
}

const isValidObjectId = (str) => {
  return /^[0-9a-fA-F]{24}$/.test(str);
}

export const addCustomer = async (req, res) => {
    const { name, address, mobileNumber } = req.body;

    if(!name || !address || !mobileNumber){
      return res.status(400).json({ message: 'Error body is not valid.'});
  }
    if(!await validatePhoneNumber(mobileNumber))
      return res.status(400).json({ message: 'Error validating number.'});
    try {
      const customer = await Customer.create({name, address, mobileNumber});
      res.json({ message: 'Customer added successfully', data: customer });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add customer', error: error.message });
    }
};

export const updateCustomer = async (req, res) => {
  const customerId = req.params.id;

  if(!isValidObjectId(customerId))
    return res.status(400).json({ message: 'Invalid customer id.'});

  const { name, address, mobileNumber } = req.body;
  
  if(!name && !address && !mobileNumber)
    return res.status(400).json({ message: 'Error body is empty.'});

  if(mobileNumber && !await validatePhoneNumber(mobileNumber))
      return res.status(400).json({ message: 'Error validating number.'});

  const updateCustomerPayload = {};

  if (name) {
    updateCustomerPayload.name = name;
  }

  if (address) {
    updateCustomerPayload.address = address;
  }

  if (mobileNumber) {
    updateCustomerPayload.mobileNumber = mobileNumber;
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { ...updateCustomerPayload },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};
    
export const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    if(!isValidObjectId(customerId))
      return res.status(400).json({ message: 'Invalid customer id.'})

    await Customer.findByIdAndDelete(customerId);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete customer', error: error.message });
  }
}

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
  }
};

