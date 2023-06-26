import openai

from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv('API_KEY')

system_msg = 'You are a helpful assistant'

app = Flask(__name__)

CORS(app)


@app.route('/giveideas')
def giveideas():
    useridea = request.args.get('useridea', '')
    if useridea == '':
        return
    else:
        useridea = "Give me 11 ideas related to " + \
            useridea + ", ending each line with a semicolon."
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                                messages=[{"role": "system", "content": system_msg},
                                                          {"role": "user", "content": useridea}])

        botideas = response["choices"][0]["message"]["content"]
        botideas = botideas[botideas.find("1."):-1]
        formatted = ""
        for i in range(10):
            formatted += botideas[0:botideas.find(";")]
            botideas = botideas[botideas.find(";") + 1:-1]

    # formatted = "stuff\nstuff\nstuff"

    return formatted


if __name__ == "__main__":
    app.run(host="localhost", port=4000, debug=True)
