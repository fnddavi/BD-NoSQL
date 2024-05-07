/*
// submeta o comando a seguir:
mongoimport ^
--uri "mongodb://127.0.0.1:27017/bdmeteorologico" ^
--collection "estacoes" ^
--file "C:\Users\Fernando\Desinvolvimento\BD-NoSQL\Ativ1-DadosIncorporados\arquivo\arquivo.json" ^
--jsonArray

// Curiosidade: o arquivo.json foi gerado usando o seguinte comando:
mongoexport ^
--uri "mongodb://127.0.0.1:27017/bdmeteorologico" ^
--collection "dados" ^
--out "C:\Users\Fernando\Desinvolvimento\BD-NoSQL\Ativ1-DadosIncorporados\arquivo" ^
--jsonArray
*/

//
db.estacoes.countDocuments()

// 1) Apresentando os documentos da coleção estacoes
db.estacoes.find(
    {}, 
    { 
      _id: 0, 
      uf: 1, 
      estacao: 1, 
      latitude: 1, 
      longitude: 1 
    }
  ).sort({estacao: 1})
  
/*
Este comando faz o seguinte:

find() é o método usado para buscar documentos na coleção.
O primeiro parâmetro {} é a consulta, que está vazia, portanto, todos os documentos serão retornados.
O segundo parâmetro é a projeção, que especifica os campos a serem incluídos no resultado. Aqui, estamos incluindo os campos uf, estacao, latitude e longitude, e excluindo o campo _id.
sort({estacao: 1}) ordena os resultados pelo campo estacao em ordem ascendente.
*/ 

// 2) Apresentando os documentos da coleção estacoes com a quantidade de leituras
db.estacoes.aggregate([
    {
      $project: {
        estacao: 1,
        quantidade_leituras: { $size: "$leituras" }
      }
    },
    {
      $sort: { estacao: 1 }
    }
  ])
/*
Este comando faz o seguinte:

aggregate() é o método usado para processar dados e retornar resultados calculados.
O primeiro estágio $project é usado para selecionar os campos necessários e calcular a quantidade de leituras. Aqui, estamos incluindo o campo estacao e criando um novo campo quantidade_leituras que representa a quantidade de elementos no array leituras.
O segundo estágio $sort é usado para ordenar os resultados pelo campo estacao em ordem ascendente. 
*/ 

// 3) Apresentando a média, a menor e a maior temperatura do ar registrada na estação VITORIA
db.estacoes.aggregate([
    {
      $match: { estacao: "VITORIA" }
    },
    {
      $unwind: "$leituras"
    },
    {
      $group: {
        _id: "$estacao",
        media_temperaturaAr: { $avg: "$leituras.temperaturaAr" },
        minima_temperaturaAr: { $min: "$leituras.temperaturaAr" },
        maxima_temperaturaAr: { $max: "$leituras.temperaturaAr" }
      }
    },
    {
      $project: {
        _id: 0,
        estacao: "$_id",
        media_temperaturaAr: 1,
        minima_temperaturaAr: 1,
        maxima_temperaturaAr: 1
      }
    }
  ])

/*
Este comando faz o seguinte:

$match é usado para filtrar os documentos da coleção estacoes onde o campo estacao é igual a “VITORIA”.
$unwind é usado para transformar cada elemento do array leituras em um documento separado.
$group é usado para agrupar os documentos pela estação e calcular a média, mínima e máxima do campo temperaturaAr.
$project é usado para formatar o documento de saída, removendo o campo _id e incluindo os campos estacao, media_temperaturaAr, minima_temperaturaAr e maxima_temperaturaAr.
*/

// 4) Apresentando a quantidade de leituras registradas em cada estação
db.estacoes.aggregate([
    {
      $unwind: "$leituras"
    },
    {
      $match: {
        "leituras.datahora": {
          $gte: ISODate("2024-01-02T00:00:00.000Z"),
          $lte: ISODate("2024-01-03T23:00:00.000Z")
        }
      }
    },
    {
      $group: {
        _id: "$estacao",
        leituras: {
          $push: {
            leitura: "$leituras.temperaturaAr",
            data: "$leituras.datahora"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        estacao: "$_id",
        leituras: 1
      }
    }
  ])
  
  /*
Este comando faz o seguinte:

* $unwind é usado para transformar cada elemento do array leituras em um documento separado.
* $match é usado para filtrar as leituras que estão no intervalo de datas especificado.
* $group é usado para agrupar os documentos pela estação e criar um novo campo leituras que é um array contendo os campos leitura e data.
* $project é usado para formatar o documento de saída, removendo o campo _id e incluindo os campos estacao e leituras.
*/ 

// 5)
db.estacoes.aggregate([
    {
      $unwind: "$leituras"
    },
    {
      $match: { estacao: "VITORIA" }
    },
    {
      $project: {
        dia: { $dateToString: { format: "%Y-%m-%d", date: "$leituras.datahora" } },
        temperaturaAr: "$leituras.temperaturaAr"
      }
    },
    {
      $group: {
        _id: "$dia",
        media_temperaturaAr: { $avg: "$temperaturaAr" },
        minima_temperaturaAr: { $min: "$temperaturaAr" },
        maxima_temperaturaAr: { $max: "$temperaturaAr" },
        quantidade: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        dia: "$_id",
        media_temperaturaAr: 1,
        minima_temperaturaAr: 1,
        maxima_temperaturaAr: 1,
        quantidade: 1
      }
    },
    {
      $sort: { dia: 1 }
    },
    {
      $limit: 4
    }
  ])

/* 
Este comando faz o seguinte:

$unwind é usado para transformar cada elemento do array leituras em um documento separado.
$match é usado para filtrar as leituras da estação “VITORIA”.
O primeiro $project é usado para extrair o dia da datahora e selecionar o campo temperaturaAr.
$group é usado para agrupar os documentos pelo dia e calcular a média, mínima, máxima e quantidade de valores do campo temperaturaAr.
O segundo $project é usado para formatar o documento de saída, removendo o campo _id e incluindo os campos dia, media_temperaturaAr, minima_temperaturaAr, maxima_temperaturaAr e quantidade.
$sort é usado para ordenar os resultados pelo campo dia em ordem ascendente.
$limit é usado para limitar o resultado aos 4 primeiros documentos.
*/

