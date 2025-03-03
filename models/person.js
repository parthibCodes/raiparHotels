const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,  // Use String to preserve leading zeros
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save',async function(next){
    const person = this;
    //hash the password only if it has been modified or it is new
    if(!person.isModified('password')){
        return next();
    }
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password

        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatched = await bcrypt.compare(candidatePassword,this.password);
        return isMatched;
    }catch(err){
        throw err;
    }
}

// Create the person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;  // Export the model to be used in the routes
