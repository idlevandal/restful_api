const mongoose = require('mongoose');

const connectDB = async (connString) => {
    try {
        const conn = await mongoose.connect(connString,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
             })
    
             console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;