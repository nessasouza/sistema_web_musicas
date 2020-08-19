from config import *
from modelo import Musica

@app.route("/")
def inicio():
    return 'Sistema de Cadastro de Músicas. '+\
        '<a href="/listar_musicas">Listar músicas</a>'

@app.route("/listar_musicas")
def listar_musicas():
    # obter as musicas do cadastro
    musicas = db.session.query(Musica).all()
    # aplicar o método json que a classe Musica possui a cada elemento da lista
    musicas_em_json = [ x.json() for x in musicas]
    # converter a lista do python para json
    resposta = jsonify(musicas_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

app.run(debug=True)