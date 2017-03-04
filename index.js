var express = require('express');
var mongoose = require('mongoose');
var shortid = require('shortid');
var app = express();
mongoose.connect(''); // add your own url.
var Schema = mongoose.Schema;
var Url = mongoose.model('Url', {
    redirectTo: {
        type: String,
        required: true
    },
    redirectId: {
        type: String,
        default: shortid.generate,
        unique: true
    }
});
app.get('/:id', (req, res) => {
    Url.findOne({redirectId: req.params.id}, (err, url) => {
        if(!url) {
            res.redirect('https://dak.sh');
        } else {
            res.redirect(`https://${url.redirectTo}`);
        }
    });
});
app.get('/', (req, res) => {
    res.redirect('https://dak.sh');
});

app.get('/make/:url', (req, res) => {
    var url = new Url({
        redirectTo: req.params.url
    });
    url.save((err) => {
        res.json({
            url: req.params.url,
            redirect: id
        });
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
