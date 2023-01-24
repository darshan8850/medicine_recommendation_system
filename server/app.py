from flask import Flask
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# data = pd.read_csv("processedData.csv")
data = pd.read_csv("server\processedData.csv",encoding='utf-8')


@app.route("/")
def home():
    return "Hello, World!"


@app.route("/predict/<condition>", methods=["POST", "GET"])
def predict(condition):
    top = data[data['condition'] == condition][['drugName','usefulness']].sort_values(by = 'usefulness',ascending = False)
    top = top.drop_duplicates(subset=['drugName']).head(5).reset_index(drop=True).to_dict()
    return ({'drugs': top})


if __name__ == "__main__":
    app.run(debug=True)