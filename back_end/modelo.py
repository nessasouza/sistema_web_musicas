from config import *

class Musica(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cantor = db.Column(db.String(254))
    genero = db.Column(db.String(254))

    # método para expressar a pessoa em forma de texto
    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.cantor + ", " + self.genero
    # expressao da classe no formato json
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cantor": self.cantor,
            "genero": self.genero
        }

# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

    # teste da classe Musica
    m1 = Musica(nome = "Ninguém da certo comigo", cantor = "Elana Dara", 
        genero = "Pop")
    m2 = Musica(nome = "Perdição", cantor = "L7nnon", 
        genero = "Hip-Hop/Rap")        
    
    # persistir
    db.session.add(m1)
    db.session.add(m2)
    db.session.commit()
    
    # exibir a pessoa
    #print(m2)

    # exibir a pessoa no format json
    #print(m2.json())