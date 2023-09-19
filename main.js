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
      "", // add the origin of frontend here
    ],
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server started at port ${PORT}`);
  dbConnection(process.env.MONGO_DB_URI);
});

routes(app);
