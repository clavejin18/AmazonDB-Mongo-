// Dependencies
var express = require('express');
var mongojs = require('mongojs');
var logger = require('morgan');
var path = require('path');
var app = express();

// Setting App
app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

// Database configuration
var databaseUrl = 'products';
var collections = ['new', 'used', 'refurbished'];

// Setting mongojs configuration
var db = mongojs(databaseUrl, collections);

// Logging errors for db connection
db.on('error', function (error) {
    console.log('Database Error:', error);
});

// Creating routes 
// ====
// Inventory
app.get('/inventory', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'));
});
// New inventory
app.get('/new', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'));
});
// Used inventory
app.get('/used', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'));
});
// Refurbished inventory
app.get('/refurbished', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'));
});
// Sell your product
app.get('/sell', function (request, response) {
    response.sendFile(path.join(__dirname, './public/sell.html'));
});

// Posting sell data on DB
app.post('/submit', function (request, response) {
    console.log(request.body);
    // Inserting to proper collection
    if (request.body === "new") {
        db.new.insert(request.body, function (error, saved) {
            if (error) {
                console.log(error);
            }
            else {
                response.send(saved);
            }
        });
    }
    else if (request.body === "used") {
        db.used.insert(request.body, function (error, saved) {
            if (error) {
                console.log(error);
            }
            else {
                response.send(saved);
            }
        });
    }
    else {
        db.refurbished.insert(request.body, function (error, saved) {
            if (error) {
                console.log(error);
            }
            else {
                response.send(saved);
            }
        });
    }
});
// Displaying all inventory
app.get('/inventory', function (request, response) {
    // New 
    db.new.find({}, function (error, found) {
        if (error) {
            console.log(eror);
        }
        else {
            response.json(found)
        }
    });
    // Used 
    db.used.find({}, function (error, found) {
        if (error) {
            console.log(error);
        }
        else {
            response.json(found)
        }
    });
    // Refurbished
    db.refurbished.find({}, function (error, found) {
        if (error) {
            console.log(error);
        }
        else {
            response.json(found);
        }
    });
});
// Displaying new inventory 
app.get('/new', function (request, response) {
    db.new.find({}, function (error, found) {
        if (error) {
            console.log(eror);
        }
        else {
            response.json(found)
        }
    });
});
// Displaying used inventory
app.get('/used', function (request, response) {
    db.used.find({}, function (error, found) {
        if (error) {
            console.log(eror);
        }
        else {
            response.json(found)
        }
    });
});
// Displaying refurbished inventory
app.get('/refurbished', function (request, response) {
    db.refurbished.find({}, function (error, found) {
        if (error) {
            console.log(eror);
        }
        else {
            response.json(found)
        }
    });
});

// Listen on port 3000
app.listen(3000, function () {
    console.log('App running on port 3000!')
});

