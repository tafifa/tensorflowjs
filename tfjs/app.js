const express = require("express");
const app = express();
const multer = require('multer');
const fs = require("fs");

const { loadModel, predict } = require("./src/ml-process");

(async () => {

const model = await loadModel();
// Middleware for json response
app.use(express.json())

// Middleware for root
app.get("/", (req,res) => {
  res.json({result: "Server is running and connected"})
});

//Middleware for upload image using memorystorage (equal to we don't want to store anywhere)
const storage = multer.memoryStorage();
const imageUpload = multer({ storage: storage });


// Middleware for prediction ML
app.post("/predicts", imageUpload.single("image"), (req, res) => {
  const imageBuffer = req.file.buffer;

  (async () => {
    //Get Prediction
    const prediction = await predict(model, imageBuffer);

    const [paper, rock, scissors] = prediction;
    if (paper) {
      res.json({result: "Paper"});
    }
  
    if (rock) {
      res.json({result: "Rock"})
    }

    if (scissors) {
      res.json({result: "Scissors"})
    }
  })();
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
})();
