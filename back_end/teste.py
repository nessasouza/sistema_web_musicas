from modelo import *
import os

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
    
    print(m1.json())
    print(m2.json())
    print(m3.json())
    print(m4.json())
    print(m5.json())
    print(m6.json())
    print(m7.json())

    