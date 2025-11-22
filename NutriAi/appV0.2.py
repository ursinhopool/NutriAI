#==========================================================================================================
#Dependencias

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
#==========================================================================================================
#Variaveis Globais

info_login = []
info_pessoal = []
registros = []
dieta = []

#==========================================================================================================
#AI



#==========================================================================================================
#Servidor

app = Flask(__name__)
CORS(app)

#==========================================================================================================
#Rota de sign_up

@app.rout("/api/sign_up", methods=["POST"])
def sign():
    signUp = request.get_json()
    email_sign = signUp.get("email_sign")
    senha_sign = signUp.get("senha_sign")

    novo_cadastro = {
        "email": email_sign,
        "senha": senha_sign

    }

    info_login.append(novo_cadastro)

    if not email_sign:
        return jsonify({"Sucesso" : False, "message": "insira um email valido, por favor!"}), 400
    
    if not senha_sign:
        return jsonify({"Sucesso" : False, "message": "Adicione uma senha com no minimo oito caracteres por favor!"}), 400
    
    if email_sign and senha_sign:
        return jsonify({"Sucesso": True, "message": "email cadastrado com sucesso"}), 200
    


#==========================================================================================================
#Rota de Login

@app.route("/api/login", methods=["POST"])
def login():

    login = request.get_json()
    email_login = login.get("email")
    password_login = login.get("password")

    for usuario in info_login:
        if email_login == usuario["email"] and password_login == usuario["senha"]:
            return jsonify({"success": True, "message": "Login realizado!"})
        
    return jsonify({"Sucess": False, "message": "Email ou Senha incorreta."}), 401
    
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

    novo_info_pessoal = {
        "nome": nome,
        "sexo": sexo,
        "altura": altura,
        "peso": peso,
        "idade": idade,
        "alergia": alergia,
        "alimentosngostados": alimentosngostados,

     }

    info_pessoal.append(novo_info_pessoal)

    if not all([nome, sexo, altura, peso, idade,alergia,alimentosngostados]):
        return jsonify({"Sucesso" : False, "message":'Preencha todos os campos obrigatórios'}), 400
    else:
         return jsonify({"success": True, "message":"Dados salvos com sucesso"}), 200
    
#==========================================================================================================
#Registro
    
@app.route("/api/Registro", methods= ["POST"])
def registro():
    regis = request.get_json()
    calorias = regis.get("calorias")
    exercicios = regis.get("exercicio")

    add_registro = {
        "Kcal": calorias,
        "exercicios": exercicios
    }

    registros.append(add_registro)
    
    if not exercicios or not calorias:
        return jsonify({"Erro": "Informações incompletas!"})
    
#==========================================================================================================
  
if __name__ == "__main__":
    app.run(debug=True, port=5000)
