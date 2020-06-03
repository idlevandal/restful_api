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
            $group: {
                _id: null,
                peopleArr: {$push: {country: '$_id', numPeople: '$numPeople'}},
                totalPeople: {$sum: '$numPeople'}
            }
        },
        {
            $unwind: '$peopleArr'
        },
        {
            $project: {
                _id: 0,
                personPerCountry: '$peopleArr.numPeople',
                country: '$peopleArr.country',
                percentage: {$multiply: [{$divide: ['$peopleArr.numPeople', '$totalPeople']}, 100]}
            }
        }
      ]).
      then(function (result) {
        res.json(result);
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

router.patch('/:id', async (req, res) => {
    const entries = Object.keys(req.body);
    const updates = {};
    for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i]
    }

    try {
        const updated = await Person.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updates},
            {
                new: true,
                useFindAndModify: false
            }
        );
        res.json(updated);
    } catch (err) {
        res.json({msg: 'Error updating person', error: err})
    }
})

module.exports = router;