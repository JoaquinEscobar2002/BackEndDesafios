import { Router } from 'express';
import Students from '../dao/dbManager/students.manager.js';

const router = Router();
const studensManager = new Students();

router.get('/', async (req, res) => {
    try {
        const studens = await studensManager.getAll();
        res.send({ Status: 'success', payload: studens});
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message})
    }
});

router.post('/', async (req, res) => {
    try {
        const { first_name: firstName, last_name: lastName, dni, email, birth_date: birthDate, gender } = req.body;

        if(!firstName || !lastName || !dni || !email || !birthDate || !gender){
            return res.status(400).send({status: 'error', message: 'Incomplete values'})
        };

        const result = await studensManager.save({
            first_name: firstName,
            last_name: lastName,
            dni,
            email,
            birth_date: birthDate,
            gender
        });

        res.status(201).send({ Status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message})
    }
});

export default router;