import express, {Application} from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/db";

const app:Application = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use("/api/users", userRoutes);
sequelize.sync().then(()=> {
    console.log('Database Connected');
})
export default app;