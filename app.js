const express   = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    routes      = require('./routes/index.js');


mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://kingsley:UNAEnGx7dfwyBHWM@main.wjkvk.mongodb.net/cluster?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB')
})
.catch( err => {
    console.log(err)
});


app.use(bodyParser.json());
app.use('/owners', routes);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    return next(err)
});

if(app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: err
        });
    });
}


module.exports = app;