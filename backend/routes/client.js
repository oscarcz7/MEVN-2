import express, { Router } from 'express';
const router = express.Router();

import Client from '../models/client';

router.post('/nclient', async(req, res) => {
    const body ={
        name: req.body.name
    }
    try {
        const clientDB = await Client.create(body);
        res.json(clientDB);
    } catch (error) {
        return res.status(500).json({
            msg: 'error',
            error
        })
    }
})

router.get('/client/:Name', async(req, res) => {
    const name = req.params.Name;
    try {
        const clientDB = await Client.findOne({name})
        res.json(clientDB);
    } catch (error) {
        return res.status(400).json({
            msg: 'Error',
            error
        })
    }
})

router.get('/client',async (req, res) => {
    
    try {
        const clientDB = await Client.find({});
        res.json(clientDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });//server error code
    }
});


module.exports = router;