from flask import Flask, render_template, request, jsonify
from langchain_experimental.llms import ChatLlamaAPI
from langchain.prompts.chat import ChatPromptTemplate
from dotenv import load_dotenv
import os
from llamaapi import LlamaAPI



app = Flask(__name__)

API_KEY = "LL-h0i3F9lswfZPiYvj6QinatRKgpwUb0mXlSKUopSVnyYotGGGS8OM2qCGffXHBJeq"
URL = "https://api.llama-api.com"
model = "llama-13b-chat"

# LLAMA_API_KEY = 'LL-Dz9a7fOIKeaj3tVFP06dZGwQbena50Cg7EWTOlV7gpn561kajaoGS5rbIp6R5oUn'

llama = LlamaAPI(
    API_KEY)
chat_model = ChatLlamaAPI(client=llama)


template = """Tu es un assistant transpilateur c'est à dire convertir le programe écrit en {current_lang} en un programe {target_lang}. Tu parle uniqulent en français"""

human_template = "{text}"


chat_prompt = ChatPromptTemplate.from_messages([
    ("system", template),
    ("human", human_template),
])


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/transpile', methods=['POST'])
def transpile():
    input_language = request.json['inputLanguage']
    target_language = request.json['targetLanguage']
    user_input = request.json['code']

    if input_language == 'other':
        input_language = request.json.get('otherLanguage', '')

    if target_language == 'other':
        target_language = request.json.get('otherLanguage', '')
        
    if target_language == 'other':
        target_language = request.json.get('otherTargetLanguage', '')

    messages = chat_prompt.format_messages(current_lang=input_language,
                                           target_lang=target_language,
                                           text=user_input)
    response = chat_model.predict_messages(messages)
    print(response.content)
    
    return jsonify({"response": response.content})


if __name__ == '__main__':
    app.run(debug=True)
