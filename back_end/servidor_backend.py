from config import *
from modelo import Musica

@app.route("/")
def inicio():
    return 'Sistema de cadastro de músicas. '+\
        '<a href="/listar_musicas">Operação listar</a>'

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

@app.route("/incluir_musica", methods=['post'])
def incluir_musica():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Musica(**dados) # criar a nova musica
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

app.run(debug=True)