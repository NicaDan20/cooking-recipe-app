import mongoose from "mongoose"

const connectionString = 'mongodb://127.0.0.1:27017/recipe-app-db'

export function connectToDb() {
    try {
        mongoose.connect(connectionString);
        console.log("Connected!")
    } catch(err) {
        console.log(err);
    }
}

export function closeDbConnection() {
    try {
        mongoose.connection.close()
        console.log("Disconnected")
    } catch (err) {
        console.log(err)
    }
}

