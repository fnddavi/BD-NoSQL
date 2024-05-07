/*
// Submeta os comandos a seguir para carregar os dados do arquivo artists.json:
mongoimport ^
    --uri "mongodb://127.0.0.1:27017/bdatividade" ^
    --collection "artists" ^
    --file "C:\Users\Fernando\Desinvolvimento\BD-NoSQL\Ativ2-ModeloDadosRelac\dados\artists.json" ^
    --jsonArray

//Submeta os comandos a seguir para carregar os dados do arquivo albums.json:
mongoimport ^
    --uri "mongodb://127.0.0.1:27017/bdatividade" ^
    --collection "albums" ^
    --file "C:\Users\Fernando\Desinvolvimento\BD-NoSQL\Ativ2-ModeloDadosRelac\dados\albums.json" ^
    --jsonArray

*/

// Para conferir se foi corretamente carregado, execute os comandos a seguir:
db.artists.countDocuments()
db.albums.countDocuments()

// 1) Apresentando os documentos da coleção artists
db.artists.updateMany({}, { $rename: { "href": "source", "id": "spotifyid" } });

/*
Este comando usa o método updateMany para atualizar todos os documentos ({} representa um objeto de consulta vazio, ou seja, corresponde a todos os documentos) na coleção artists. O operador $rename é usado para renomear os campos.
*/

// 2) Apresentando os documentos da coleção artists
db.artists.updateMany({}, { $unset: { "external_urls": "", "images": "", "type": "", "uri": "" } });

/*
Este comando usa o método updateMany para atualizar todos os documentos ({} representa um objeto de consulta vazio, ou seja, corresponde a todos os documentos) na coleção artists. O operador $unset é usado para remover os campos.
*/

// 3) Apresentando os documentos da coleção artists
db.artists.aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres" } },
    { $project: { _id: 0, genre: "$_id" } },
    { $sort: { genre: 1 } }
]);
/*
Este comando usa o método aggregate para processar os documentos na coleção artists. O estágio $unwind é usado para desestruturar o array genres. O estágio $group é usado para agrupar os documentos, evitando repetições. O estágio $project é usado para projetar o campo genre e remover o campo _id do resultado. Finalmente, o estágio $sort é usado para ordenar o resultado em ordem alfabética.
*/

// 4) Ta errado. 4 é o próximo comando