from config import *

class Musica(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    artista = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    ano = db.Column(db.String(254))
    duracao = db.Column(db.String(254))

    # método para expressar a musica em forma de texto
    def __str__(self):
        return self.nome + "[id="+str(self.id)+ "], " +\
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

class Playlist (db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nome = db.Column(db.String(254))
    criador = db. Column(db.String(254))

    def __str__(self):
        return [str(self.id)]+ ") "+ self.nome + ", " + self.criador
    
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "criador": self.criador
        }

class Selecao(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    ordem = db.Column(db.Integer)
    musica_id = db.Column(db.Integer, db.ForeignKey(Musica.id), nullable = False)
    musica = db.relationship("Musica")
    playlist_id = db.Column(db.Integer, db.ForeignKey(Playlist.id), nullable = False)
    playlist = db.relationship("Playlist")

    def __str__(self):
        return f"{self.ordem}, {self.musica}, {self.playlist}"

    def json(self):
        return {
            "id": self.id,
            "ordem": self.ordem,
            "musica_id": self.musica_id,
            "musica": self.musica.json(),
            "playlist_id": self.playlist_id,
            "playlist": self.playlist.json()
        }


# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

    # teste da classe Musica
    m1 = Musica(nome = "All I Want", artista = "Kodaline", 
        genero = "Alternativa/Indie", ano="2013", duracao="4:58")
    m2 = Musica(nome = "Superheroes", artista = "The Script", 
        genero = "Pop", ano="2014", duracao="4:33")
    m3 = Musica(nome = "Perdição", artista = "L7nnon", 
        genero = "Hip-Hop/Rap", ano="2019", duracao="4:35")
    m4 = Musica(nome = "Ninguém dá certo comigo", artista = "Elana Dara", 
        genero = "Pop", ano="2020", duracao="2:25")
    m5 = Musica(nome = "Farol", artista = "Comunidade Católica Colo de Deus", 
        genero = "Cristã/Gospel", ano="2020", duracao="6:58")
    m6 = Musica(nome = "Meu Bem", artista = "Cai Sahra", 
        genero = "Pop", ano="2020", duracao="3:13")
    m7 = Musica(nome = "Textão", artista = "Zé Neto e Cristiano", 
        genero = "Sertanejo", ano="2020", duracao="3:05")
        
    # persistir
    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.add(m4)
    db.session.add(m5)
    db.session.add(m6)
    db.session.add(m7)
    db.session.commit()
    
    
    #criar playlist
    p1 = Playlist(nome="Melhores do Sertanejo", criador="Vanessa de Souza")

    db.session.add(p1)
    db.session.commit()
    
    #criar selecao
    s1 = Selecao(ordem= 1, musica = m7, playlist = p1)
    db.session.add(s1)
    db.session.commit()
    print(f"Selecao: {s1.json()}")

