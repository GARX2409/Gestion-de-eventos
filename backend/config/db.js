const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Breynerstevengarayleudo:123@batabasedeproyectos.kwpeu.mongodb.net/?retryWrites=true&w=majority&appName=batabasedeproyectos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;