import express from "express";
import cors from "cors";
import nameRouter from "./routes/names";

const server = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/names", nameRouter);//names.ts har "/" men her bruger jeg use("/names") til den route så fetch/insomnia skal bruge "/names"
//"/post" etc. er på samme names.ts fil så endpoint er "/names/post"

app.listen(server, () => console.log(`Server running on http://localhost:${server}`));
