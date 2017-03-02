var express = require('express');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://no:no@ds058369.mlab.com:58369/lulz');
var Schema = mongoose.Schema;
var Url = mongoose.model('Url', {
    redirectTo: {
        type: String,
        required: true
    },
    redirectId: {
        type: String,
        required: true,
        unique: true
    }
});
app.get('/:id', (req, res) => {
    Url.findOne({redirectId: req.params.id}, (err, url) => {
        if(!url) {
            res.redirect('https://dak.sh');
        } else {
            res.redirect(redirectTo);
        }
    });
});
app.get('/', (req, res) => {
    res.redirect('https://dak.sh');
});

app.get('/make/:url', (req, res) => {
    var id = Math.random().toString(36).substr(22);
    var url = new Url({
        redirectTo: req.params.url,
        redirectId: id
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