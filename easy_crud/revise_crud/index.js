const express = require('express');
const mongoose = require('mongoose');

const app = express();

// app.use(cors());

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/Music').then(() => {
    console.log('connected successfully');
}).catch((err) => { console.error(err) });

const musicSchema = new mongoose.Schema({
    songname: String,
    film: String,
    md: String,
    singer: String,
    actor: String,
    actress: String
});

const music = mongoose.model('music', musicSchema);

app.post('/store', async (req, res) => {
    try {
        const prod = await music.create(req.body);
        res.status(200).json(prod);
        console.log(prod);
    } catch (err) {
        console.error(err);
    }
});

app.get('/getall', async (req, res) => {
    try {
        const prod = await music.find({});
        const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>  
    <h1>Music Database</h1>
    <table border=1>
        <tr>
            <th>SongName</th>
            <th>MovieName</th>
            <th>DirectorName</th>
            <th>SingerName</th>
            <th>Actor</th>
            <th>Actress</th>
        </tr>
        ${prod.map(u =>
            `<tr>
                <td>${u.songname}</td>
                <td>${u.film}</td>
                <td>${u.md}</td>
                <td>${u.singer}</td>
                <td>${u.actor}</td>
                <td>${u.actress}</td>
            </tr>`
        ).join(' ')}
    </table>
</body>
</html>`;
        res.send(htmlResponse);
    } catch (err) {
        console.log(err);
    }
});

app.get('/count', async (req, res) => {
    try {
        const count = await music.countDocuments();
        const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head> 
<body>
    <h1>The count of the documents is ${count} </h1>
</body>
</html>`;
        res.send(htmlResponse);
    } catch (err) {
        console.log(err);
    }
});

app.get('/songs/:mdname', async (req, res) => {
    try {
        const reqdir = req.params.mdname;
        const prod = await music.find({ md: reqdir });
        const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Songs sung by music director ${reqdir}</h1>
    <table border=1>
        <tr>
            <th>SongName</th>
            <th>MovieName</th>
            <th>DirectorName</th>
            <th>SingerName</th>
            <th>Actor</th>
            <th>Actress</th>
        </tr>
        ${prod.map(u =>
            `<tr>
                <td>${u.songname}</td>
                <td>${u.film}</td>
                <td>${u.md}</td>
                <td>${u.singer}</td>
                <td>${u.actor}</td>
                <td>${u.actress}</td>
            </tr>`
        ).join(' ')}
    </table>
</body>
</html>`;
        res.send(htmlResponse);
    } catch (err) {
        console.log(err);
    }
});

app.get('/song/musicdirector/:musicdir/singer/:singername', async (req, res) => {
    try {
        const redir = req.params.musicdir
        const redirs = req.params.singername

        const prod = await music.find({ musicdir: redir, singername: redirs })

        const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Songs sung by music director:${redir} and singer name:${redirs}</h2>
    <table border=1>
        <tr>
            <th>SongName</th>
            <th>MovieName</th>
        </tr>
        ${prod.map(u =>
            `<tr>
                <td>${u.songname}</td>
                <td>${u.film}</td>
            </tr>`
        ).join(' ')}
    </table>
</body>
</html>`
        res.send(htmlResponse)
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/songs/:film/:singer', async (req, res) => {
    try {
        const reqfilm = req.params.film
        const reqsinger = req.params.singer

        const prod = await music.find({ film: reqfilm, singer: reqsinger })

        const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Songs by the specified singer ${reqsinger} and the specified film ${reqfilm} are</h2>
    <table border=1>
        <tr>
            <th>SongName</th>
        </tr>
        ${prod.map(u =>
            `<tr>
                <td>${u.songname}</td>
            </tr>`
        ).join(' ')}
    </table>
</body>
</html>`

        res.send(htmlResponse);
    }
    catch {
        console.log(err);
    }
})

app.listen(8000, () => {
    console.log('listening on port 8000 -- http://localhost:8000');
});
