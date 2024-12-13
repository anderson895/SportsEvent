const cors = require("cors");
var express = require("express");
require("express-group-routes");
var app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
var bodyparser = require("body-parser");
const { userRouter, teamsRouter, eventsRouter, sportsRouter, gameRouter, mediaRouter } = require("./router/main.router.js");

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174','http://localhost:5175','http://localhost:5177','https://ncf-sems.vercel.app'], 
    credentials: true,
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));

  httpServer.listen(process.env.APP_PORT || 3006, () => {
    console.log(`Listening to the Port: ${httpServer.address().port}`);
  });
  
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  app.use(bodyparser.json());
  
  app.group("/api/v1", (router) => {
    router.use("/user", userRouter);
    router.use("/teams", teamsRouter);
    router.use("/events", eventsRouter);
    router.use("/sports", sportsRouter);
    router.use("/games", gameRouter);
    router.use("/media", mediaRouter);
  });
  
  app.get("/", async (req, res) => {
    res.send("API running 🥳");
  });
