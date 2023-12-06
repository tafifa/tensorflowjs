from tensorflow.keras.models import load_model
import tensorflowjs as tfjs

model_path = load_model("model_fix.h5")
output_path = "modelJSON.json"

tfjs.converters.save_keras_model(model_path, output_path)