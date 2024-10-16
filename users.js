import express from 'express';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

const router = express.Router();

let users = [];

router.get('/', (req, res) => {

    res.send(users)
});

router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ... user, id: uuidv4()});

    res.send(`User with the name ${user.firstName} added to the database!`);
});

//users/2 => req.prams {id: 2 }

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id != id);

    res.send(`User with the id ${id} deleted from the database.`);
});

router.patch('/:id', (req, res) => { 
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    
    const user = users.find((user) => user.id === id); 

    if (!user) return res.status(404).send(`User with the ID ${id} not found`);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    
    res.send(`User with the ID ${id} has been updated`);
});


export default router;
