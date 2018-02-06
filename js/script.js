$(document).ready(function () {
    var parametros = {
        email: 'diego.guimaraes.si@gmail.com'
    };

    var date, aux, x, errado, text = "";

    if (localStorage.token == "") {
        $.ajax({
            type: 'POST',
            url: "http://testedev.baixou.com.br/processo/auth",
            data: parametros,
            success: function (data) {
                aux = data.token;
                if (aux != null) {
                    localStorage.token = data.token;
                }
            }
        });
    }

    $.ajax({
        type: 'GET',
        url: "http://testedev.baixou.com.br/processo/lista?token=" + localStorage.token,
        success: function (dados) {
            for (var i = 0; dados.ofertas.length > i; i++) {
                //Adicionando registros retornados na tabela
                // $('.conteudo').append('<tr><td>' + dados.ofertas[i].titulo + '</td><td>' + dados.ofertas[i].imagem + '</td><td>' + dados.ofertas[i].preco + '</td></tr>');
                text = dados.ofertas[i].titulo;
                text = text.toUpperCase();
                if (dados.ofertas[i].nparcela != null) {
                    $('.conteudo').append(
                        '<div class="col-md-4 text-center col-sm-6 col-xs-12">' +
                        '   <div class="thumbnail product-box">' +
                        '       <img title="' + text + '" src="' + dados.ofertas[i].imagem + '" alt="website template image" />' +
                        '       <div class="caption">' +
                        '            <h4 title="' + text + '"><a href="#">' + text + '</a></h4>' +
                        '            <p>PREÇO :<strong> R$ ' + dados.ofertas[i].preco + '</strong></p>' +
                        '            <p>' + dados.ofertas[i].nparcela + ' x ' + dados.ofertas[i].vparcela + '</p>' +
                        '            <button type="button" class="btn btn-success">Comprar</button>' +
                        '       </div>' +
                        '    </div>' +
                        '</div>');
                } else {
                    $('.conteudo').append(
                        '<div class="col-md-4 text-center col-sm-6 col-xs-12">' +
                        '   <div class="thumbnail product-box">' +
                        '       <img title="' + text + '" src="' + dados.ofertas[i].imagem + '" alt="website template image" />' +
                        '       <div class="caption">' +
                        '            <h4 title="' + text + '"><a href="#">' + text + '</a></h4>' +
                        '            <p>PREÇO :<strong> R$ ' + dados.ofertas[i].preco + '</strong></p>' +
                        '            <p> &nbsp;</p>' +
                        '            <button type="button" class="btn btn-success">Comprar</button>' +
                        '       </div>' +
                        '    </div>' +
                        '</div>');
                }
            }
            // errado = dados.error;
            if (errado == "Token não informada.") {
                errado = "";
                atualizaStorage();
            }
        },
    });


    function atualizaStorage() {
        localStorage.token = "";
        location.reload();
    }

    $("#pesquisa").keyup(function () {
        var stringPesquisa = $(this).val();
        stringPesquisa = stringPesquisa.toUpperCase();
        $('.product-box').parent().hide();
        $('.product-box:contains(' + stringPesquisa + ')').parent().show()
    });


});