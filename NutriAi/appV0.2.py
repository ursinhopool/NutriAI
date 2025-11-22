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
dietas = []

#==========================================================================================================
#Servidor

app = Flask(__name__)
CORS(app)

#==========================================================================================================
#Rota de sign_up

@app.route("/api/sign_up", methods=["POST"])
def sign():
    signUp = request.get_json()
    email_sign = signUp.get("email_sign")
    senha_sign = signUp.get("senha_sign")

    if not email_sign:
        return jsonify({"success": False, "message": "Insira um email válido."}), 400

    if not senha_sign:
        return jsonify({"success": False, "message": "A senha deve ter 8 caracteres."}), 400

    novo_cadastro = {
        "email": email_sign,
        "senha": senha_sign
    }

    info_login.append(novo_cadastro)

    return jsonify({"success": True, "message": "Cadastro realizado!"}), 200


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
        
    return jsonify({"success": False, "message": "Email ou senha incorretos."}), 401
    

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

    if not all([nome, sexo, altura, peso, idade, alergia, alimentosngostados]):
        return jsonify({"success": False, "message": "Preencha todos os campos."}), 400

    novo_info_pessoal = {
        "nome": nome,
        "sexo": sexo,
        "altura": altura,
        "peso": peso,
        "idade": idade,
        "alergia": alergia,
        "alimentosngostados": alimentosngostados
    }

    info_pessoal.append(novo_info_pessoal)

    return jsonify({"success": True, "message": "Dados salvos!"}), 200
    

#==========================================================================================================
#Registro
    
@app.route("/api/Registro", methods= ["POST"])
def registro():
    regis = request.get_json()
    calorias = regis.get("calorias")
    exercicios = regis.get("exercicio")

    if not calorias or not exercicios:
        return jsonify({"Erro": "Informações incompletas"}), 400

    add_registro = {
        "Kcal": calorias,
        "exercicios": exercicios
    }

    registros.append(add_registro)

    return jsonify({"success": True, "message": "Registro salvo!"})


#==========================================================================================================
#Calculos
def calculos():
    for IMC in info_pessoal:
        peso_corp = float(IMC["peso"])
        altura_corp = float(IMC["altura"])
        idade_corp = int(IMC["idade"])
        MaOrFe = IMC["sexo"]

        if MaOrFe == "Masculino":
            MF = 1 
        
        else:
            MF = 0
#==========================================================================================================
#IMC calculo
        imc = peso_corp / (altura_corp *altura_corp)
        IMC["imc"] = round(imc, 2)

#==========================================================================================================
#percentual de gordura, calculo.

        per_gordura = 1.20 * imc + 0.23 * idade_corp - 10.8 * MF - 5.4
        IMC["percentual_gordura"] = round(per_gordura, 2)
    
#==========================================================================================================
  
if __name__ == "__main__":
    app.run(debug=True, port=5000)
