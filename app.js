const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
require('dotenv/config')
const connectDB = require("./db")
connectDB();
// setting template engine
app.set('view engine', 'ejs');


// configuring the body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require('mongoose')
const Post = require('./model/posts')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up static folder up
app.use(express.static(path.join(__dirname, 'public')))

// index route
app.get('/', ( req, res) => {
    res.render('index')
});
// index route
app.get('/index', ( req, res) => {
        res.render('index')
      });

// success route to render success page
app.get('/success', ( req, res) => {
    res.render('success')
});

// post route for the for form input
app.post('/index', async (req, res) => {
    const fullname = req.body.fullname;
    const mail = req.body.mail;
    if (fullname === '' || mail === '') {
        res.render('index', {
            Message: 'Please Input The Neccasary Value Below!!'
        })
    }
    const postData = {
        fullname,
        mail
    }
    try {
        const post = new Post(postData)
        // runing out variable name lols
       const food = await post.save()
       console.log(food)
        res.render('success')
        
    } catch (err) {
        console.error(err.message);
    }
    
});

app.get('/admin', async (req, res) => {
    const data = await Post.find()

    console.log(data)
  
    res.render('admin', {
        pageTitle: 'AdminPage',
        data:data
    })
})


app.use('/404-page', (req, res) => {
    res.status(404).render('404-page')
})

app.listen(5500, () => {
    console.log('Server Started at 5500')
})