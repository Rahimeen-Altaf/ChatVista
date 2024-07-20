import mongoose from "mongoose";

const connectDb = (uri) => {
    mongoose.connect(uri, { dbName: "ChatVista" }).then((data) => {
        console.log(`Connected to the database: ${data.connection.host}`);
    }).catch((err) => {
        console.log(`Error connecting to the database. \n${err}`);
    });
};

export { connectDb };