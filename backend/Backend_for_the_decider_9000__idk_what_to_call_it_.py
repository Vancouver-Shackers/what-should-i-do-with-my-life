

# Import the openai package
import openai

from flask import Flask, request

# Paste in the key from https://platform.openai.com/account/api-keys
openai.api_key = ""

# Define the system message (Tell the bot what it is, ex. You are a helpful assistant who understands quantum physics and relativity)
system_msg = 'You are a helpful assistant'

app = Flask(__name__)


@app.route('/decide')
def decide():
    choice1 = request.args.get('choice1', '')
    choice2 = request.args.get('choice2', '')
    if choice1 == '' or choice2 == '':
        return
    else:
        prompt = "Give me a numbered list of 5 pros and 5 cons of both" + choice1 + " and " + choice2 + ", ending each line with a semicolon. In the format of: " + choice1 + ": pros: 1-5, cons: 1-5, " + choice2 + ": pros: 1-5, cons: 1-5. pros / cons 1 through 4 should start with the number, followed by a period, and end with a semicolon. pro / con 5 should end with a period."
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                        messages=[{"role": "system", "content": system_msg},
                                         {"role": "user", "content": prompt}])
        
        botideas = response["choices"][0]["message"]["content"]
        formatted = ""
        for i in range(2):
            formatted += botideas[0:botideas.find(":")] + "\n"
            botideas = botideas[botideas.find(":") + 1:]
            formatted += botideas[0:botideas.find("1.")] + "\n"
            botideas = botideas[botideas.find("1."):]
            for j in range(4):
                formatted += botideas[0:botideas.find(";")] + "\n"
                botideas = botideas[botideas.find(";") + 1:]
            botideas = botideas[botideas.find(".") + 1:]
            formatted += "5. " + botideas[0:botideas.find(".")] + "\n"
            botideas = botideas[botideas.find(".") + 1:]
            formatted += botideas[0:botideas.find("1.")] + "\n"
            botideas = botideas[botideas.find("1."):]
            for k in range(4):
                formatted += botideas[0:botideas.find(";")] + "\n"
                botideas = botideas[botideas.find(";") + 1:]
            botideas = botideas[botideas.find(".") + 1:]
            formatted += "5." + botideas[0:botideas.find(".")] + "\n" + "\n"
            botideas = botideas[botideas.find(".") + 1:]           
       
    
    return formatted

if __name__ == "__main__":
    # Launch the Flask dev server
    app.run(host="localhost", debug=True)