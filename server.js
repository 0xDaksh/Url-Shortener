var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

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
mongoose.connect('mongodb://daksh:Noob#123@ds145359.mlab.com:45359/udaksh');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:id', (req, res) => {
    Url.findOne({
        redirectId: req.params.id
    }, (err, url) => {
        if(!url) {
            res.redirect('/');
        } else {
            res.redirect(url.redirect);
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
    var id = Math.random().toString(36).substr(22);
    var url = new Url({
        redirectId: id,
        redirect: req.body.url
    });
    url.save((err) => {
        res.json({
           short: 'https://linke.herokuapp.com/' +  id,
           url: req.body.url
        });
    });
    } else {
    var id = Math.random().toString(36).substr(22);
    var url = new Url({
        redirectId: id,
        redirect: req.body.url
    });
    url.save((err) => {
        res.json({
           short: 'https://linke.herokuapp.com/' +  id,
           url: 'http://' + req.body.url
        });
    });
    }
}
});
app.listen(process.env.PORT);
