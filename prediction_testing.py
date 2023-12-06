import tensorflow as tf
import numpy as np

def load_model():
    model_url = tf.keras.utils.get_file('model.json', 'https://storage.googleapis.com/ml-model-artventureid/model.json')
    return tf.keras.models.load_model(model_url)

def predict(model, image_path):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, [224, 224])
    image = tf.expand_dims(image, axis=0)
    image = tf.cast(image, tf.float32) / 255.0  

    predictions = model.predict(image)

    return predictions

def predict_class(predict_result):
    predicted_class = np.argmax(predict_result)
    print("Predicted Class:", predicted_class)
    if predicted_class==1:
        print("Bali Following Independence")
    elif predicted_class==2:
        print("Dang Hyang Nirartha")
    elif predicted_class==3:
        print("Sagung Wah In Preparation To Attack The Dutch")
    elif predicted_class==4:
        print("Spreading The News of The Proclamation of Indonesia")
    elif predicted_class==5:
        print("The Battle of Jagaraga")
    elif predicted_class==6:
        print("The Crowning Of Sri Kresna Kepakisan")
    elif predicted_class==7:
        print("The Establishment Of Indonesian People Struggling Board Of Sunda Kecil")
    elif predicted_class==8:
        print("The Naval Battle In Bali Strait")
    elif predicted_class==9:
        print("The Rise Of Youth Organization")
    elif predicted_class==10:
        print("Painting I Gusti Ngurah Rai")
    elif predicted_class==11:
        print("Painting Menyambut Proklamasi Kemerdekaan RI")
    elif predicted_class==12:
        print("Painting Ngurah Rai Mengatur Siasat Tempur")
    else:
        print("RandomData")

# Example usage
loaded_model = load_model()
path = './test/DangHyangNirartha/00001.jpg'
result = predict(loaded_model, path)
result_class = predict_class(result)

