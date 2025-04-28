import * as dotenv from 'dotenv'
import { app } from "./app";
import mongoose from 'mongoose'


dotenv.config({
    path: `${__dirname}/../config.env`
})

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
    console.error('❌ DATABASE or DATABASE_PASSWORD not defined in config.env');
    process.exit(1);
}



const DB = "mongodb+srv://rostyslavshyian:5WMLUJyxaGwL13FL@cluster-grid.ewhwmtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-grid";

mongoose.connect(DB)
    .then(() => {
        console.log('DB connection successful');
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
