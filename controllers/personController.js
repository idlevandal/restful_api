const Person = require('../models/Person');

exports.getPeople = async (req, res) => {
    const persons = await Person.find().sort({country: 1});

    res.json(persons);
}

exports.getPerson = async (req, res) => {
    try {
        const user = await Person.findById(req.params.personId);
        res.json(user);
    } catch (err) {
        res.json({msg: 'Error retrieving user'});
    }
};