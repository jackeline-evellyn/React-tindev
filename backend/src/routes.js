const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

//recebe a requisição e resposta

// routes.get('/', (req, res) => {
//     return res.json({message: `Hello World ${req.query.name}` });
// });

// routes.post('/devs', (req,res) => {
//     console.log(req.body);
    
//     return res.json({ ok: true });
// });
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes