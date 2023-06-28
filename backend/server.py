import openai

from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv('API_KEY')

system_msg1 = 'give me 11 ideas someone could do. end each line/idea with a semicolon'
system_msg2 = r'''you give 5 pros and 5 cons (very short 1-3 word) for both options. in the format:
Option 1: (option)
pros:
1. (pro here)
2. (pro here)
...
cons:
1. (pro here)
2. (pro here)
...

Option 2: (option)
(repeated)

'''

app = Flask(__name__)

CORS(app)


@app.route('/giveideas')
def giveideas():
    useridea = request.args.get('useridea', '')
    if useridea == '':
        return ''

    useridea = "ideas related to " + useridea
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{
                                                "role":
                                                "system",
                                                "content":
                                                system_msg1
                                            }, {
                                                "role": "user",
                                                "content": useridea
                                            }])

    print(response)

    botideas = response["choices"][0]["message"]["content"]
    botideas = botideas[botideas.find("1."):-1]
    formatted = ""
    for i in range(10):
        formatted += botideas[0:botideas.find(";")]
        botideas = botideas[botideas.find(";") + 1:-1]

    return formatted


@app.route('/decide')
def decide():
    choice1 = request.args.get('choice1', '')
    choice2 = request.args.get('choice2', '')
    if choice1 == '' or choice2 == '':
        return ''

    # prompt = "Give me a numbered list of 5 pros and 5 cons of both" + choice1 + " and " + choice2 + ", ending each line with a semicolon. In the format of: " + choice1 + ": pros: 1-5, cons: 1-5, " + choice2 + ": pros: 1-5, cons: 1-5. pros / cons 1 through 4 should start with the number, followed by a period, and end with a semicolon. pro / con 5 should end with a period."
    prompt = "pros and cons for: " + choice1 + " and " + choice2

    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{
                                                "role":
                                                "system",
                                                "content":
                                                system_msg2
                                            }, {
                                                "role": "user",
                                                "content": prompt
                                            }])

    botideas: str = response["choices"][0]["message"]["content"]

    print(response)

    thing: list[str] = botideas.split("Option 2")

    pros1 = thing[0][thing[0].find("Pros:\n")+6:thing[0].find("\n\n")]
    cons1 = thing[0][thing[0].find("Cons:\n")+6:-1]

    pros2 = thing[1][thing[1].find("Pros:\n")+6:thing[1].find("\n\n")]
    cons2 = thing[1][thing[1].find("Cons:\n")+6:]

    return pros1 + "\n\n" + cons1 + "---\n" + pros2 + "\n\n" + cons2

    

    # for i in range(2):
    #     formatted += botideas[0:botideas.find(":")] + "\n"
    #     botideas = botideas[botideas.find(":") + 1:]
    #     formatted += botideas[0:botideas.find("1.")] + "\n"
    #     botideas = botideas[botideas.find("1."):]
    #     for j in range(4):
    #         formatted += botideas[0:botideas.find(";")] + "\n"
    #         botideas = botideas[botideas.find(";") + 1:]
    #     botideas = botideas[botideas.find(".") + 1:]
    #     formatted += "5. " + botideas[0:botideas.find(".")] + "\n"
    #     botideas = botideas[botideas.find(".") + 1:]
    #     formatted += botideas[0:botideas.find("1.")] + "\n"
    #     botideas = botideas[botideas.find("1."):]
    #     for k in range(4):
    #         formatted += botideas[0:botideas.find(";")] + "\n"
    #         botideas = botideas[botideas.find(";") + 1:]
    #     botideas = botideas[botideas.find(".") + 1:]
    #     formatted += "5." + botideas[0:botideas.find(".")] + "\n" + "\n"
    #     botideas = botideas[botideas.find(".") + 1:]

    # return formatted


if __name__ == "__main__":
    app.run(host="localhost", port=4000, debug=True)
