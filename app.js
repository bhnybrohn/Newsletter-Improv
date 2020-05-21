const express = require('express');
const bodyparser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose')
require('dotenv/config')
const app = express();
const stackPosts = []

const Post = require('./model/posts')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', ( req, res, next) => {
    res.render('index')
});
app.post('/index', (res, req) => {
    const fullName = req.body.fullname;
    const name = req.body.name;
    const post = {
        fullname,
        name
    }
    const conData = JSON.stringify(post);
    console.log(conData)

    if (fullName === '' || mail === '') {
        res.render('index', {
            Message: 'Please Input The Neccasary Value Below!!'
        })
    }
    res.redirect('/success')
})

app.get('/', (req, res) => {
    res.render('/admin', {
        pageTilte: 'AdminPage',
        NamePost: fullname,
        NameMail: mail
    })
})
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,
    useUnifiedTopolopy: true},
    () => {
        console.log('Connected to MongoDB!')
    })

app.use('/404-page', (req, res) => {
    res.status(404).render('/404.page')
})

app.listen(5500, () => {
    console.log('Server Started at 5500')
})