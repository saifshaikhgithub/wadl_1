const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./models/Users')

const app = express();
app.use(cors())
app.use(express.json())

app.listen(8080, () => {
    console.log('listening on port 8080 -- http://localhost:8080');
})

mongoose.connect('mongodb://localhost:27017/student').then(() => {
    console.log('connected seccesfully');
})
    .catch(err => {
        console.error('error connecting');
    })

app.get('/getuser', async (req, res) => {
    try {
        const userss = await UserModel.find();
        res.status(200).json(userss);
    }
    catch (err) {
        console.error('error', err);
    }

})

app.post('/store', async (req, res) => {
    try {
        const prod = await UserModel.create(req.body);
        res.status(200).json(prod);
    }
    catch (err) {
        console.log(err);
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await UserModel.findByIdAndUpdate(id, req.body);
        if (!prod) {
            return res.status(404).json({ message: 'student not found' });
        }

        res.status(200).json(prod);
    }
    catch (err) {
        console.log(err);
    }


})

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const prod = await UserModel.findByIdAndDelete(id);

        if (!prod) {
            return res.status(404).json({ message: 'student not found' });
        }

        res.status(200).json({ message: 'student deleted successfully' });
    }
    catch (err) {
        console.log(err);
    }
})

