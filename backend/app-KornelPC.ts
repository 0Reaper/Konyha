import express, { json } from 'express';
import { dbConnect } from './config/db_connect';
import { User } from './models/User';
import { Model, Sequelize } from 'sequelize';
import { Recipe } from './models/Recipe';
import { Rating } from './models/Rating';
import { Ingredient } from './models/Ingredient';
import { SellableFoodRating } from './models/SellableFoodRating';
import { SellableFood } from './models/SellableFood';
import { Category } from './models/Category';
import userRouter from './routes/user';

const app = express();
let database: Sequelize;

const startServer = async () => {
    try {
        const PORT = 5000;
        database = await dbConnect(); // Wait for database connection
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

app.use(json())

app.get("/", async (req, res) => {
    try {
        const recipe = await User.findOne({ where: { user_id: 2 } });
        res.json({ "ok": true });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

//Routerek
app.use("/user", userRouter);

startServer();