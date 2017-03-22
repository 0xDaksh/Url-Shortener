var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    shortid = require('shortid'),
    bodyParser = require('body-parser');

var databaseURL = '', // Enter your mongodb database url here.
    siteURL=''; //Enter your site URL here
    
siteURL = siteURL.length>0 ? siteURL : 'localhost';
    
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('./static'));
var Url = mongoose.model('Url', {
    redirectId: {
        type: String,
        required: true,
        unique: true
    },
    redirect: {
        type: String,
        required: true
    }
});
mongoose.connect(databaseURL);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:id', (req, res) => {
    Url.findOne({
        redirectId: req.params.id
    }, (err, url) => {
        if(!url) {
            console.log('nu url');
            res.redirect('/');
        } else {
            console.log(url.redirect);
            res.redirect(`${url.redirect}`);
        }
    });
});
 function isURL(str) {
     var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
     var url = new RegExp(urlRegex, 'i');
     return str.length < 2083 && url.test(str);
}

app.post('/make', (req, res) => {
if(!req.body.url) {
    res.json({
        error: 'please enter a valid url'
    });
} else {
    if(isURL(req.body.url)) {
    var url = new Url({
        redirectId: shortid.generate(),
        redirect: req.body.url
    });
    url.save((err) => {
        res.json({
           short: siteURL + '/' +  url.redirectId,
           url: req.body.url
        });
    });
    } else {
    var url = new Url({
        redirectId: shortid.generate(),
        redirect: 'http://' + req.body.url
    });
    url.save((err) => {
        res.json({
           short: siteURL + '/' +  url.redirectId,
           url: 'http://' + req.body.url
        });
    });
    }
}
});
var port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port);
console.log('Server listening on port ', port);
