const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/logsDB',{useUnifiedTopology:true});

require('./user');