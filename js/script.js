$(document).ready(function () {
    var parametros = {
        email: 'diego.guimaraes.si@gmail.com'
    };

    var date, aux, x, errado, text = "";

    if (!localStorage.token) {
        localStorage.token = "";
    }

    if (localStorage.token == "") {
        $.ajax({
            type: 'POST',
            url: "http://testedev.baixou.com.br/processo/auth",
            data: parametros,
            success: function (data) {
                aux = data.token;
                if (aux != null) {
                    localStorage.token = data.token;
                    localStorage.aux = localStorage.token;
                }
            },
        });
    }

    if (aux == null) {
        localStorage.token = localStorage.aux;
    }

    $.ajax({
        type: 'GET',
        url: "http://testedev.baixou.com.br/processo/lista?token=" + localStorage.token,
        success: function (dados) {
            for (var i = 0; dados.ofertas.length > i; i++) {
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
                        '</div>'
                    );
                }
            }
            if (dados.error == "Token expirada.") {
                localStorage.token = "";
            }
        },
    });

    $("#pesquisa").keyup(function () {
        var stringPesquisa = $(this).val();
        stringPesquisa = stringPesquisa.toUpperCase();
        $('.product-box').parent().hide();
        $('.product-box:contains(' + stringPesquisa + ')').parent().show()
    });

});