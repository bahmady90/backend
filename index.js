import express from "express";
import cors from "cors";
import 'dotenv/config';




const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use(cors());

app.get("/", async (req, res) => {
  try{
    res.status(200).json(cities);
  } catch(err){
    res.status(400).json(err);
  }
})


app.post("/getWeather", async (req, res) => {
    try{
        console.log(req.body.position);
        const {lat, long} = req.body.position;
        const result = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${lat},${long}&days=7&alerts=yes&lang=de`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "key" : "46b13655b48d444fa0572708242507",
            "Access-Control-Allow-Origin": "*",
          },
        })
        const data = await result.json();
        res.status(200).json(data);
      }
      catch(err){
        console.log(err.message);
        res.status(400).json(err);
      } 
});

app.listen(4000, () => {
    console.log("listening to port 4000");
});

