from config import *
from modelo import Musica

@app.route("/")
def inicio():
    return 'Sistema de cadastro de musicas: front-end. '+\
        '<a href="/listar_musicas">Operação listar</a>'

@app.route("/listar_musicas")
def listar_musicas():
    # obter as musicas do back-end
    resultado_requisicao = requests.get('http://localhost:5000/listar_musicas')
    # dados json podem ser carregados em dicionários do python
    json_musicas = resultado_requisicao.json() 
    # inicializar uma lista do python
    musicas_em_python = []
    # percorrer as pessoas em json
    for m in json_musicas:
        # criar uma pessoa passando as informações do dicionário
        mu = Musica(**m)
        # adicionar a pessoa convertida na lista de pessoas
        musicas_em_python.append(mu)
    
    # fornecer a lista de pessoas para a página exibir as pessoas
    return render_template("listar_musicas.html", listagem = musicas_em_python)

app.run(debug=True, port=4999)