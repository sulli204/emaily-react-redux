const mongoose = require('mongoose');
const { Schema } = mongoose ;      // This is the same as "const Schema = mongoose.Schema;"

const userSchema = new Schema({ // Using googleID as unique identifier
    googleId: String,
    credits: {                  // Credits for Survey creation and distribution
        type: Number,
        default: 0
    }
});

mongoose.model('users', userSchema);