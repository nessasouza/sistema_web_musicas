$(function() { // quando o documento estiver pronto/carregado

    var urlx = 'http://nessasouza.pythonanywhere.com/'
// MÚSICA ----------------------------------------------------------------------------------------------
    // função para EXIBIR músicas na tabela ___________________________________________________________
    function exibir_musicas() {
        $.ajax({
            url: urlx + '/listar_musicas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (musicas) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaMusicas').empty();
            // tornar a tabela visível
            mostrar_conteudo("cadastroMusicas");      
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

// código para mapear click do botão INCLUIR música _____________________________________________________________
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
            url: urlx + '/incluir_musica',
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
        if (! $("#cadastroMusicas").hasClass('d-none')) {
            // atualizar a página de listagem
            exibir_musicas();
        }
    });

// código para o ícone de EXCLUIR ________________________________________________________________
$(document).on("click", ".excluir_musica", function() {
    // obter ID do ícone
    var componente_clicado = $(this).attr('id'); 
    // obter ID da música
    var nome_icone = "excluir_";
    var id_musica = componente_clicado.substring(nome_icone.length);
    // solicitar a exclusão
    $.ajax({
        url: urlx + '/excluir_musica/'+id_musica,
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

//----------------------------------------------------------------------------------------------------------------------
// PLAYLIST ----------------------------------------------------------------------------------------------------------
// função para EXIBIR músicas na tabela___________________________________________________________________________
    function exibir_playlists() {
        $.ajax({
            url: urlx + '/listar_playlists',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (playlists) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaPlaylists').empty();
            // tornar a tabela visível
            mostrar_conteudo("cadastroPlaylists");      
            // percorrer a lista de músicas retornadas; 
            for (var i in playlists) { //i vale a posição no vetor
                lin = '<tr id="linha_'+playlists[i].id+'">' + // elabora linha com os dados da música
                '<td>' + playlists[i].nome + '</td>' + 
                '<td>' + playlists[i].criador + '</td>' + 
                '<td><a href=# id="excluir_' + playlists[i].id + '" ' + 
                'class="excluir_playlist"><img src="img/excluir.png" '+
                'alt="Excluir playlist" title="Excluir playlist" height=30 width= 30></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaPlaylists').append(lin);
            }
        }
    }

// INCLUIR playlist_____________________________________________________________________________________________________
$(document).on("click", "#btIncluirPlaylist", function() {
    //pegar dados da tela
    nome = $("#campoNomePlay").val();
    criador = $("#campoCriador").val();
    // preparar dados no formato json
    var dados = JSON.stringify({  nome: nome, criador: criador });
    // fazer requisição para o back-end
    $.ajax({
        url: urlx + '/incluir_playlist',
        type: 'POST',
        dataType: 'json', // os dados são recebidos no formato json
        contentType: 'application/json', // tipo dos dados enviados
        data: dados, // estes são os dados enviados
        success: dadosIncluidos, // chama a função listar para processar o resultado
        error: erroAoIncluir
    });
    function dadosIncluidos (retorno) {
        if (retorno.resultado == "ok") { // a operação deu certo?
            // informar resultado de sucesso
            alert("Dados incluídos com sucesso!");
            // limpar os campos
            $("#campoNomePlay").val("");
            $("#campoCriador").val("");
        } else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        }            
    }
    function erroAoIncluir (retorno) {
        // informar mensagem de erro
        alert("erro ao incluir dados, verifique o backend: ");
    }
});

    // código a ser executado quando a janela de inclusão de playlists for fechada
    $('#modalIncluirPlaylist').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#cadastroPlaylists").hasClass('d-none')) {
            // atualizar a página de listagem
            exibir_playlists();
        }
    });

// código para o ícone de EXCLUIR_________________________________________________________________________________
$(document).on("click", ".excluir_playlist", function() {
    // obter ID do ícone
    var componente_clicado = $(this).attr('id'); 
    // obter ID da música
    var nome_icone = "excluir_";
    var playlist_id = componente_clicado.substring(nome_icone.length);
    // solicitar a exclusão
    $.ajax({
        url: urlx + '/excluir_playlist/'+playlist_id,
        type: 'DELETE', 
        dataType: 'json', 
        success: playlistExcluida, 
        error: erroAoExcluir
    });
    function playlistExcluida (retorno) {
        if (retorno.resultado == "ok") { 
            // remover a linha
            $("#linha_" + playlist_id).fadeOut(1000, function(){
                alert("Playlist removida com sucesso!");
            });
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }            
    }
    function erroAoExcluir (retorno) {
        alert("Erro ao excluir dados, verifique o backend: ");
    }
});

//----------------------------------------------------------------------------------------------------------------------
//SELEÇÃO---------------------------------------------------------------------------------------------------------------
    // função para EXIBIR selecoes_______________________________________________________________________________
    // essa função é bem parecida com a função exibir_musicas, certo? ;-)
    function exibir_selecoes() {
        $.ajax({
            url: urlx + '/listar_selecoes',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (selecoes) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaSelecao').empty();
            // tornar visível a página de selecoes
            mostrar_conteudo("cadastroSelecao");      
            // percorrer a lista de selecoes retornados; 
            for (var i in selecoes) { //i vale a posição no vetor
                lin = '<tr id="linha_selecoes_'+selecoes[i].id+'">' + 
                '<td>' + selecoes[i].ordem + '</td>' + 
                // dados da musica
                '<td>' + selecoes[i].musica.nome + '</td>' + 
                '<td>' + selecoes[i].musica.artista + '</td>' + 
                '<td>' + selecoes[i].musica.genero + '</td>' + 
                '<td>' + selecoes[i].musica.ano + '</td>' + 
                '<td>' + selecoes[i].musica.duracao + '</td>' + 
                // dados da playlist
                '<td>' + selecoes[i].playlist.nome + '</td>' + 
                '<td>' + selecoes[i].playlist.criador + '</td>' + 
                '<td><a href=# id="excluir_' + selecoes[i].id + '" ' + 
                  'class="excluir_selecao"><img src="img/excluir.png"  '+
                  'alt="Excluir Selecao" title="Excluir Selecao" height=30 width= 30></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaSelecao').append(lin);
            }
        }
    }

     // INCLUIR selecao___________________________________________________________________________________________
     $(document).on("click", "#btIncluirSelecao", function() {
        //pegar dados da tela
        ordem = $("#campoOrdem").val();
        musica_id = $("#campoMusicaId").val();
        playlist_id = $("#campoPlaylistId").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ ordem: ordem, musica_id: musica_id, playlist_id: playlist_id });
        // fazer requisição para o back-end
        $.ajax({
            url: urlx + '/incluir_selecao',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: dadosIncluidos, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Dados incluídos com sucesso!");
                // limpar os campos
                $("#campoOrdem").val("");
                $("#campoMusicaId").val("");
                $("#campoPlaylistId").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });
    
    // código a ser executado quando a janela de inclusão de seleções for fechada
    $('#modalIncluirSelecao').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#cadastroSelecao").hasClass('d-none')) {
            // atualizar a página de listagem
            exibir_selecoes();
        }
    });

    // código para o ícone de EXCLUIR______________________________________________________________________________
    $(document).on("click", ".excluir_selecao", function() {
        // obter ID do ícone
        var componente_clicado = $(this).attr('id'); 
        // obter ID da música
        var nome_icone = "excluir_";
        var selecao_id = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão
        $.ajax({
            url: urlx + '/excluir_selecao/'+selecao_id,
            type: 'DELETE', 
            dataType: 'json', 
            success: selecaoExcluida, 
            error: erroAoExcluir
        });
        function selecaoExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                // remover a linha
                $("#linha_" + selecao_id).fadeOut(1000, function(){
                    alert("Seleção removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }
    });

//-----------------------------------------------------------------------------------------------------------------------



    $('#modalIncluirSelecao').on('shown.bs.modal', function (e) {
        // carregar as listas de musicas e playlists
        carregarCombo("campoMusicaId", "Musica");
        carregarCombo("campoPlaylistId", "Playlist");
    })

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: urlx + '/listar/'+nome_classe,
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: carregar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function carregar (dados) {
            // esvaziar o combo
            $('#'+combo_id).empty();
            // mostra ícone carregando...
            $('#loading_'+combo_id).removeClass('d-none');
            // percorrer a lista de dados
            for (var i in dados) { //i vale a posição no vetor
                $('#'+combo_id).append(
                    $('<option></option>').attr("value", 
                        dados[i].id).text(dados[i].nome));
            }
            // espera um pouco, para ver o ícone "carregando"
            setTimeout(() => { 
                $('#loading_'+combo_id).addClass('d-none');
             }, 1000);
        }
    }
      // função que mostra um conteúdo e esconde os outros
      function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#cadastroMusicas").addClass('d-none');
        $("#cadastroPlaylists").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#cadastroSelecao").addClass('d-none');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('d-none');      
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarMusicas", function() {
        exibir_musicas();
    });
    
    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarPlaylists", function() {
        exibir_playlists();
    });

    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    // código para mapear o click do link Selecoes
    $(document).on("click", "#linkListarSelecoes", function() {
        exibir_selecoes();
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");

        
});