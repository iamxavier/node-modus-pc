const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log + '\n')
    next();
})


// app.use((req,res,next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle: 'Site under Maintenance.',
//     })
// })

app.get('/', (req, res)=>{
     res.render('home.hbs', {
        pageTitle: 'Home Page',
      
        welcomeMessage: 'Hello there! This is the homepage of this website. Automatically generated.'
    })
});

app.get('/projects', (req,res)=>{
    res.render('project.hbs', {
        pageTitle: 'This is a projects page',
        welcomeMessage: 'This is where github projects will be displayed'
    })
})

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up at port ${port}`)
});