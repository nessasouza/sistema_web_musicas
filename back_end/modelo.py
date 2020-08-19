from config import *

class Musica(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    artista = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    ano = db.Column(db.String(254))
    duracao = db.Column(db.String(254))

    # método para expressar a pessoa em forma de texto
    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.artista + ", " + self.genero + ", " + self.ano + ", " + self.duracao
    # expressao da classe no formato json
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "artista": self.artista,
            "genero": self.genero,
            "ano": self.ano,
            "duracao": self.duracao
        }
