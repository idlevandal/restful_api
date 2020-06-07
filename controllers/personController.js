const Person = require('../models/Person');

exports.getPerson = async (req, res) => {
    const persons = await Person.find().sort({country: 1});

    res.json(persons);
}