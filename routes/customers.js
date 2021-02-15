const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

const Customers =
  // Get Courses
  router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  });

router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.message);

  const customers = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customers.save();
  res.send(customers);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const customer = await Customer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold,
        },
      },
      { new: true }
    );
    res.send(customer);
  } catch (error) {
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete({ _id: req.params.id });
    res.send(customer);
  } catch (error) {
    res
      .status(400)
      .send(`The customer with id: ${req.params.id} is not found!`);
  }
});

router.get('/:id', async (req, res) => {
  const customer = await findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`The customer with id: ${req.params.id} is not found!`);
  res.send(customer);
});

module.exports = router;
