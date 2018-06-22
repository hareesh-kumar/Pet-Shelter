const Handler = require('../controllers/pets');

module.exports = {
    Routify: function (app) {
        app.get('/api/pets', (req, res) => Handler.findAll(req, res));
        app.get('/api/pets/:petid', (req, res) => Handler.findOne(req, res));
        app.post('/api/pets', (req, res) => Handler.addnew(req, res));
        app.put('/api/pets/:petid', (req, res) => Handler.findUpdate(req, res));
        app.put('/api/pets/:petid/like', (req, res) => Handler.addLikes(req, res));
        app.delete('/api/pets/:petid', (req, res) => Handler.findDelete(req, res));
        app.all('*', (req, res) => res.sendFile((__dirname).slice(0, -14) + '/beltexam/dist/beltexam/index.html'))
        return app
    }
}