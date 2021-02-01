import express from 'express';
const router = express.Router();

//Import model of service

import Client from '../models/client.js';
import Contract from '../models/contract.js';

router.post('/ncontract/:id', async (req, res) => {
    const client_c = await Client.findById(req.params.id);
    const body = {
        description: req.body.description,
        mount: req.body.mount,
        date: req.body.date,
        client: client_c
    }

    try {
        const contractDB = await Contract.create(body);
        res.status(200).json(contractDB) //status code & service created information

    } catch (error) {
        return res.status(500).json({
            msg: 'Error occure',
            error
        }); //server error code
    }
});

router.get('/contract/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const contractDB = await Contract.findOne({ _id });
        res.status(200).json(contractDB);

    } catch (error) {
        return res.status(400).json({
            msg: 'Error occure',
            error
        }); //server error code
    }
});

router.get('/contract', async (req, res) => {
    try {
        const contractDB = await Contract.find({});
        res.json(contractDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });//server error code
    }
});

router.get('/dcontract', async (req, res) => {
    const fechaInicial = new Date(req.body.fechaInicial);
    const fechaFinal = new Date(req.body.fechaFinal);
    const fechas = [] ;


    while (fechaFinal.getTime() >= fechaInicial.getTime()) {
        fechaInicial.setDate(fechaInicial.getDate() + 1);
        fechas.push(fechaInicial.getFullYear() + '/' + (fechaInicial.getMonth() + 1) + '/' + fechaInicial.getDate())
        console.log(fechaInicial.getFullYear() + '/' + (fechaInicial.getMonth() + 1) + '/' + fechaInicial.getDate());
    }
    

    try {
        res.json(fechas);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });//server error code
    }
})




//Export router to use

module.exports = router;