/*
// Submeta os comandos a seguir para carregar os dados do arquivo artists.json:
mongoimport ^
    --uri "mongodb://127.0.0.1:27017/bdatividade" ^
    --collection "artists" ^
    --file "C:\Users\NoLAB\3D Objects\BD-NoSQL\Ativ2-ModeloDadosRelac\dados\artists.json" ^
    --jsonArray

//Submeta os comandos a seguir para carregar os dados do arquivo albums.json:
mongoimport ^
    --uri "mongodb://127.0.0.1:27017/bdatividade" ^
    --collection "albums" ^
    --file "C:\Users\NoLAB\3D Objects\BD-NoSQL\Ativ2-ModeloDadosRelac\dados\albums.json" ^
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

// 4) Listar os gêneros em ordem alfabética de todos os documentos da coleção
db.artists.aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres" } },
    { $project: { _id: 0, genre: "$_id" } },
    { $sort: { genre: 1 } }
  ]);
/*
Neste comando:

db.artists.aggregate é usado para agregar documentos na coleção artists.
O estágio $unwind: "$genres" é usado para desestruturar o array genres.
O estágio $group: { _id: "$genres" } é usado para agrupar os documentos, evitando repetições.
O estágio $project: { _id: 0, genre: "$_id" } é usado para projetar o campo genre e remover o campo _id do resultado.
O estágio $sort: { genre: 1 } é usado para ordenar o resultado em ordem alfabética.
*/

// 5)
db.artists.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres" } },
  { $project: { _id: 0, genre: "$_id" } },
  { $sort: { genre: 1 } }
]).forEach(function(doc) {
  db.genres.insertOne({ name: doc.genre });
});
/*
Neste comando:

db.artists.aggregate é usado para agregar documentos na coleção artists.
O estágio $unwind: "$genres" é usado para desestruturar o array genres.
O estágio $group: { _id: "$genres" } é usado para agrupar os documentos, evitando repetições.
O estágio $project: { _id: 0, genre: "$_id" } é usado para projetar o campo genre e remover o campo _id do resultado.
O estágio $sort: { genre: 1 } é usado para ordenar o resultado em ordem alfabética.
O método forEach é usado para iterar sobre cada documento resultante da agregação.
A função anônima function(doc) { db.genres.insertOne({ name: doc.genre }); } é usada para inserir cada resultado do aggregate como um novo documento na coleção genres.
*/

// 6)
db.artists.find().forEach(function(artist) {
    var newGenres = [];
    artist.genres.forEach(function(genre) {
      var genreDoc = db.genres.findOne({ name: genre });
      if (genreDoc) {
        newGenres.push(genreDoc._id);
      }
    });
    db.artists.updateOne({ _id: artist._id }, { $set: { genres: newGenres } });
  });

/*
Neste comando:

db.artists.find().forEach(function(artist) {...}) é usado para iterar sobre cada documento na coleção artists.
var newGenres = []; é usado para criar um novo array para armazenar os _ids dos gêneros.
artist.genres.forEach(function(genre) {...}) é usado para iterar sobre cada gênero no campo genres do artista.
var genreDoc = db.genres.findOne({ name: genre }); é usado para encontrar o documento correspondente na coleção genres com o nome do gênero.
if (genreDoc) {...} é usado para verificar se o documento do gênero foi encontrado.
newGenres.push(genreDoc._id); é usado para adicionar o _id do gênero ao novo array de gêneros.
db.artists.updateOne({ _id: artist._id }, { $set: { genres: newGenres } }); é usado para atualizar o campo genres do artista com o novo array de _ids dos gêneros.
*/