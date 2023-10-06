import express from "express";
import cors from "cors";

// utilities
import { dbConnection } from "./controller/db.js";
import { routes } from "./routes/route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://159.203.168.51", // add the origin of frontend here
      "http://localhost:4200",
      "https://job4jobless.com"
    ],
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server started at port ${PORT}`);
  dbConnection(process.env.MONGO_DB_URI);
});

routes(app);
