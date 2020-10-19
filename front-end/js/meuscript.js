$(function() { // quando o documento estiver pronto/carregado
    
    // função para exibir músicas na tabela
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
            // percorrer a lista de músicas retornadas; 
            for (var i in musicas) { //i vale a posição no vetor
                lin = '<tr id="linha_'+musicas[i].id+'">' + // elabora linha com os dados da música
                '<td>' + musicas[i].nome + '</td>' + 
                '<td>' + musicas[i].artista + '</td>' + 
                '<td>' + musicas[i].genero + '</td>' + 
                '<td>' + musicas[i].ano + '</td>' + 
                '<td>' + musicas[i].duracao + '</td>' +
                '<td><a href=# id="excluir_' + musicas[i].id + '" ' + 
                'class="excluir_musica"><img src="img/excluir.png" '+
                'alt="Excluir música" title="Excluir música" height=30 width= 30></a>' + 
                '</td>' + 
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

// código para mapear click do botão incluir música
$(document).on("click", "#btIncluirMusica", function validarform() {
    // verifica se os espaços estão preenchidos
    if ((document.getElementById("campoNome").value.length < 1) || (document.getElementById("campoArtista").value.length < 1) || 
    (document.getElementById("campoGenero").value.length < 1) || (document.getElementById("campoAno").value.length < 4) ||
    (document.getElementById("campoDuracao").value.length < 4)) {
        alert('Todos os campos devem ser preenchidos');
    } 
    else {
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
    }
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

    // código a ser executado quando a janela de inclusão de musicas for fechada
    $('#modalIncluirMusica').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#tabelaMusicas").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_musicas();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");

    // código para o ícone de excluir 
    $(document).on("click", ".excluir_musica", function() {
        // obter ID do ícone
        var componente_clicado = $(this).attr('id'); 
        // obter ID da música
        var nome_icone = "excluir_";
        var id_musica = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão
        $.ajax({
            url: 'http://localhost:5000/excluir_musica/'+id_musica,
            type: 'DELETE', 
            dataType: 'json', 
            success: musicaExcluida, 
            error: erroAoExcluir
        });
        function musicaExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                // remover a linha
                $("#linha_" + id_musica).fadeOut(1000, function(){
                    alert("Música removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }
    });

});