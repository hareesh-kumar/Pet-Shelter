const db = require('../models/pets');

var Pet = db.model

module.exports = {
    findAll: findAll,
    findOne: findOne,
    addnew: addnew,
    findUpdate: findUpdate,
    findDelete: findDelete,
    addLikes: addLikes
}

function findAll(req, res) {
    Pet.find().sort([['type', 1]])
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
function findOne(req, res) {
    Pet.findById(req.params.petid)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
async function addnew(req, res) {
    let newpet = await Pet.find({'name' : req.body.name }).then((data) => { return data; });
    console.log (newpet);
    if (newpet[0]) {
        res.json({errors : { "name" : { "message" : "Name already exists. Please choose a different name."}}});
    } else {
        Pet.create(req.body)
            .then((data) => res.json({ message: 'success', data: data }))
            .catch((err) => res.json(err));
    }
}
async function findUpdate(req, res) {
    let newpet = await Pet.find({ 'name': req.body.name }).then((data) => { return data; });
    console.log(newpet);
    if (newpet[0]) {
        if (newpet[0]._id == req.params.petid) {
            Pet.findByIdAndUpdate(req.params.petid, req.body, { new: true, runValidators: true })
                .then((data) => res.json(data))
                .catch((err) => res.json(err));
        } else {
            res.json({ errors: { "name": { "message": "Name already exists. Please choose a different name." } } });
        }
    } else {
        Pet.findByIdAndUpdate(req.params.petid, req.body, { new: true, runValidators: true })
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    }
}
function addLikes(req, res) {
    Pet.findOneAndUpdate({ "_id": req.params.petid }, { "$inc": { "likes": 1 } })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
function findDelete(req, res) {
    Pet.findByIdAndRemove(req.params.petid)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}