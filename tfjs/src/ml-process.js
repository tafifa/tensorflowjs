const tfjs = require("@tensorflow/tfjs-node");

function loadModel() {
  const modelUrl = `https://storage.googleapis.com/ml-model-artventureid/model.json`;
  return tfjs.loadLayersModel(modelUrl);
}

function predict(model, imageBuffer) {
  const tensor = tfjs.node
    .decodeJpeg(imageBuffer)
    .resizeNearestNeighbor([224,224])
    .expandDims()
    .toFloat();

  return model.predict(tensor).data();
}

module.exports = { loadModel, predict };