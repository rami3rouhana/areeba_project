import express from 'express';
import { addCustomer, updateCustomer, deleteCustomer, getAllCustomers } from '../controller/customer.controller.mjs';

const router = express.Router();

router.post('/', addCustomer);

router.put('/:id', updateCustomer);

router.delete('/:id', deleteCustomer);

router.get('/', getAllCustomers);

export default router;