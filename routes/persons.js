const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


router.get('/', async (req, res) => {
    const persons = await Person.find();

    res.json(persons);
});

router.get('/country', (req, res) => {
    Person.aggregate([
        {
            $group: { _id: '$country', numPeople: {$sum: 1}}
        },
        {
            $project: {
                numPeople: 1,
                country: '$_id.country' 
            }
        }
      ]).
      then(function (x) {
        console.log(x);
        res.json(x);
      });
});

router.post('/', async (req, res) => {
    const person = new Person({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        country: req.body.country,
        scores: req.body.scores,

    });

    try {
        const newPerson = await person.save();
        res.json(newPerson);
    } catch (err) {
        res.json({msg: 'Error saving data', error: err});
    }
});

module.exports = router;