const db = require('mongoose');

db.connect('mongodb://localhost/my_first_db');

var PetSchema = new db.Schema({
    name: { type: String, required: [true, 'Pet Name is required'], minlength: [3, 'Pet Name should be atleast 3 characters'] },
    type: { type: String, required: [true, 'Pet Type is required'], minlength: [3, 'Pet Type should be atleast 3 characters'] },
    description: { type: String, required: [true, 'Pet Description is required'], minlength: [3, 'Pet Description should be atleast 3 characters'] },
    skills: {type: Array, validate: [skillsLimit, 'A pet can have only 3 skills max']},
    likes: {type: Number}
}, { timestamps: true });

function skillsLimit(value) {
    return value.length <= 3;
}

db.model('Pet', PetSchema);

module.exports = {
    model: db.model('Pet')
}