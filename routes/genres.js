const express = require('express');
const router = express.Router();

const { Genre, validate } = require('../models/genre');

// Get Courses
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const genre = await Genre.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.send(genre);
  } catch (error) {
    res.status(404).send(`The genre with id: ${req.params.id} is not found!`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
    res.send(genre);
  } catch (error) {
    res.status(400).send(`The genre with id: ${req.params.id} is not found!`);
  }
});

router.get('/:id', async (req, res) => {
  const genre = await findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with id: ${req.params.id} is not found!`);
  res.send(genre);
});

module.exports = router;
