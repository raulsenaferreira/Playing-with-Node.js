var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;


var ufs = [ 'AL','AM','BA','DF','ES','GO','MA','MG','MT','PA','PE','PI','PR','RJ','RN','RR','RS','SC','SE','SP','TO' ]
  , concurrency = 2, casos = 0;

async.eachLimit(ufs, concurrency, function (uf, next) {
    var url = format('http://www.desaparecidos.gov.br/index.php/desparecidos/?situacao=FALSE&uf=%s&submit=Consultar', uf);
    request(url, function (err, response, body) {
        if (err) throw err;
        var $ = cheerio.load(body);

        $('.boxDesaparecidor').each(function () {
          var nome = $(this).find('.titulo').text().trim();
          var img = $(this).find('img').attr('src').trim();
          var status = $(this).find('.desaparecido').text().trim();

          if (status=='' || status==undefined) {
            status = $(this).find('.encontrado').text().trim();
          }
          
          var data = $(this).find('.dt').text().trim();
          var local = $(this).find('.local').text().trim();
          var mais = $(this).find('.readmore a').attr('href').trim();
          casos++;
          // app.insert('Desaparecido', { Nome: nome }, function (err, response) {
          //   console.log(response);
          // });

          console.log('\n\nNome: %s\nFoto: %s\nStatus: %s\nData: %s\nLocal: %s\nLeia mais em: %s ', nome, img, status, data, local, mais);
          
        });
        next();
        console.log('Número de casos: '+casos);
    });
    
});

