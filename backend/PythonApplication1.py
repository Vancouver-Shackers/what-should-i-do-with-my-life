

# Import the openai package
import openai

from flask import Flask, request

# Paste in the key from https://platform.openai.com/account/api-keys
openai.api_key = ""

# Define the system message (Tell the bot what it is, ex. You are a helpful assistant who understands quantum physics and relativity)
system_msg = 'You are a helpful assistant'

app = Flask(__name__)


@app.route('/giveideas')
def giveideas():
    useridea = request.args.get('useridea', '')
    if useridea == '':
        return
    else:
        useridea = "Give me 11 ideas related to " + useridea + ", ending each line with a semicolon."
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                        messages=[{"role": "system", "content": system_msg},
                                         {"role": "user", "content": useridea}])
        botideas = response["choices"][0]["message"]["content"]
        botideas = botideas[botideas.find("1."):-1]
        formatted = ""
        for i in range(10):
            formatted += botideas[0:botideas.find(";")] + "\n"
            botideas = botideas[botideas.find(";") + 1:-1]
       

    return formatted

if __name__ == "__main__":
    # Launch the Flask dev server
    app.run(host="localhost", debug=True)