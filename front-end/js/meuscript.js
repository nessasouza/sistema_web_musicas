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
// código para mapear click do botão incluir profissao
    $(document).on("click", "#btIncluirMusica", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        artista = $("#campoArtista").val();
        genero = $("#campoGenero").val();
        ano = $("#campoAno").val();
        duracao = $("#campoDuracao").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, artista: artista, genero: genero, ano: ano, duracao: duracao });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_musica',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: musicaIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function musicaIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Música incluída com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoArtista").val("");
                $("#campoGenero").val("");
                $("#campoAno").val("");
                $("#campoDuracao").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    // código a ser executado quando a janela de inclusão de pessoas for fechada
    $('#modalIncluirMusica').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#tabelaMusicas").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_musicas();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");
});