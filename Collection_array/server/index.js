const express = require('express');

const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const studentModel = require('./models/usermodel');

app.listen(8080, () => {
    console.log('listening on port 8080 : http://localhost:8080');
})




mongoose.connect('mongodb+srv://worldtourmydream:drpZbfthxf5DLvb8@cluster0.fr930i7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('connection established');
})
    .catch(() => {
        console.error('connection error');
    })

// app.get('/', (req, res) => {
//     res.send("hello we are listening");
// })

//post
app.post('/api/student', async (req, res) => {
    try {
        const student = await studentModel.create(req.body);

        res.status(200).json(student);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/api/student', async (req, res) => {
    try {
        const student = await studentModel.find({});
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/api/student/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const student1 = await studentModel.findById(id);

        res.status(200).json(student1);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('id not found');
    }
})

// app.delete('/api/student/:id', async (req, res) => {
//     try {
//         const { id } = req.params

//         const 

//     }
//     catch (error) {

//     }
// })

//update

app.put('/api/student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student1 = await studentModel.findByIdAndUpdate(id, req.body);
        if (!student1) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const updatedStudent = await studentModel.findById(id);

        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.delete('/api/student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentModel.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
});
