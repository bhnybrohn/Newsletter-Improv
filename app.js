const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const app = express()
require('dotenv/config')
const connectDB = require("./db")
connectDB();
// setting template engine
app.set('view engine', 'ejs');
// configuring the body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
const mongoose = require('mongoose')
const Post = require('./model/posts')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up static folder up
app.use(express.static(path.join(__dirname, 'public')))

// index route
app.get('/', (req, res) => {
    res.render('index')
});
// index route
app.get('/index', (req, res) => {
    res.render('index')
});

// success route to render success page
app.get('/success', (req, res) => {
    const fullname = req.body.fullname;
    res.render('success', {
        fullname: fullname
    })
});

// post route for the f or form input
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
        const food = await post.save()
        res.render('success', {
            fullname: fullname
        })

    } catch (err) {
        console.error(err.message);
    }

});

// app.delete('/admin', async(req,res)=>{ 
//     const deletedPost = await Post.remove({_id: req.params.postId})
// })
app.post('/admin', async (req, res) => {
    const allPost = await Post.find()
    
    var mailingList = []
    for (let i = 0; i < allPost.length; i++) {
        mailingList.push(allPost[i].mail)
    }
    console.log(mailingList)
    const subject = req.body.subject;
    const message = req.body.message;
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                type: "OAuth2",
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            },
        });

        let info = await transporter.sendMail({
            from: '"SneakersPlug NG " <ritchiehouseofclothing97@gmail.com>',
            to: `${mailingList}`,
            subject: `${subject}`,
            text: `${message}`,
            html: `<p>${message}</p>`
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('admin', {
            Mesg: "Newsletter Sent Successfully!",
            pageTitle: 'Success'
        })

    } catch (err) {
        console.log(err)
    }
})
app.get('/admin', async (req, res) => {
    const data = await Post.find()

    res.render('admin', {
        pageTitle: 'AdminPage',
        data: data
    })
})
app.use('/404-page', (req, res) => {
    res.status(404).render('404-page')
})

const PORT = process.env.PORT || 5500;


app.listen(PORT, () => {
    console.log('Server Started at 5500')
})