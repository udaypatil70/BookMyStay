import express from 'express';
import "dotenv/config";
import cors from "cors";


const app = express();
app.use(cors())  // we can add with fronted

app.get('/' , (req, res) => res.send("API is Working"))


const PORT = process.env.PORT || 3000 ;


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));