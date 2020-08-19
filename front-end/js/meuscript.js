$(function() { // quando o documento estiver pronto/carregado
    
    // função para exibir musicas na tabela
    function exibir_musicas() {
        $.ajax({
            url: 'http://localhost:5000/listar_musicas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
         
        function listar (musicas) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaMusicas').empty();
            // tornar a tabela visível
            mostrar_conteudo("tabelaMusicas");      
            // percorrer a lista de musicas retornadas; 
            for (var i in musicas) { //i vale a posição no vetor
                lin = '<tr>' + // elabora linha com os dados da musica
                '<td>' + musicas[i].nome + '</td>' + 
                '<td>' + musicas[i].artista + '</td>' + 
                '<td>' + musicas[i].genero + '</td>' + 
                '<td>' + musicas[i].ano + '</td>' + 
                '<td>' + musicas[i].duracao + '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaMusicas').append(lin);
            }
        }
    }

    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#tabelaMusicas").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('invisible');      
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarMusicas", function() {
        exibir_musicas();
    });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });


    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");
});