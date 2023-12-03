const tfjs = require("@tensorflow/tfjs");

function loadModel() {
  const modelUrl = `https://storage.googleapis.com/ml-nodejs/tfjs/model.json`;
  return tfjs.loadLayersModel(modelUrl);
}

function predict(model, imageBuffer) {
  const tensor = tfjs.decodeImage(imageBuffer)
    .resizeNearestNeighbor([150, 150])
    .expandDims()
    .toFloat();

  return model.predict(tensor).data();
}

module.exports = { loadModel, predict };
