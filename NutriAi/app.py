#==========================================================================================================
#Dependencias

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

#==========================================================================================================
#AI



#==========================================================================================================
#Servidor

app = Flask(__name__)
CORS(app)

#==========================================================================================================
#Rota de Login


@app.route("/api/login", methods=["POST"])
def login():
    login = request.get_json()
    email_login = login.get("email")
    password_login = login.get("password")

    if email_login == "agenteconsegue@nutri.com" and password_login == "CaViPe":
        return jsonify({"success": True, "message": "Login realizado!"})
    else:
        return jsonify({"success": False, "message": "Email ou Senha incorreta."}), 401
    
#==========================================================================================================
#Formulário

@app.route("/api/formulario", methods=["POST"])
def questionario():
    quest = request.get_json()
    nome = quest.get('nome')
    sexo = quest.get('sexo')
    altura = quest.get('altura')
    peso = quest.get('peso')
    idade = quest.get('idade')
    alergia = quest.get('alergia')
    alimentosngostados = quest.get('alimentosngostados')

    if not all([nome, sexo, altura, peso, idade,alergia,alimentosngostados]):
        return jsonify({'error': 'Preencha todos os campos obrigatórios'}), 400
    else:
         return jsonify({"success":"Dados salvos com sucesso"})
    

  
if __name__ == "__main__":
    app.run(debug=True, port=5000)