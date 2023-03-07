// Copyright offworld.ai 2020

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/states", function (req, res) {
  states = [];
  res.setHeader("Content-Type", "application/json");

  const numRobots = 10;
  const maxPose = 10; // max coordinates of robot inside a box with 10x10 dimensions
  const maxCurrent = 6; // max current from battery sensor

  for (let i = 0; i < numRobots; i++) {
    const pose_x = Math.random() * maxPose; // random pose values between 0 and 10
    const pose_y = Math.random() * maxPose;
    const current = Math.random() * maxCurrent; // random current values between 0 and 6
    const voltage = 12; // voltage always 12V

    const state = {
      id: `robot_${i}`,
      pose_x: pose_x.toFixed(2),
      pose_y: pose_y.toFixed(2),
      values: {
        current: current.toFixed(1),
        voltage: voltage.toFixed(1),
      },
    };

    states.push(state);
  }

  res.end(JSON.stringify({ states: states }));
});

process.env.PORT
  ? console.log(process.versions, `server listening on ${process.env.PORT}`)
  : console.log(process.versions, `server listening on 3001`);

app.listen(process.env.PORT || 3001);
