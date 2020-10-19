from config import *
from modelo import Musica

@app.route("/")
def inicio():
    return 'Sistema de Cadastro de Músicas. '+\
        '<a href="/listar_musicas">Listar músicas</a>'

@app.route("/listar_musicas")
def listar_musicas():
    # obter as músicas do cadastro
    musicas = db.session.query(Musica).all()
    # aplicar o método json que a classe música possui a cada elemento da lista
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
    # receber as informações da nova música
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Musica(**dados) # criar a nova música
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_musica/<int:musica_id>", methods=['DELETE'])
def excluir_musica(musica_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Musica.query.filter(Musica.id == musica_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

app.run(debug=True)