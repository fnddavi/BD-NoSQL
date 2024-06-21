// 01

// Inicia uma agregação na coleção 'foods'
db.getCollection('foods').aggregate([
  {
    // Filtra os documentos onde a categoria é "Leite e derivados"
    $match: { "category.name": "Leite e derivados" }
  },
  {
    // Projeta (seleciona) os campos desejados na saída
    // Inclui 'description' e 'calories' e remove '_id' da saída
    $project: {
      _id: 0,                       // Exclui o campo '_id' da saída
      description: "$description",  // Inclui o campo 'description' na saída
      calories: "$energy.value"     // Inclui o campo 'calories' com valor de 'energy.value'
    }
  },
  {
    // Ordena os documentos pelo campo 'calories' em ordem decrescente
    $sort: { calories: -1 }
  }
])

// 02

db.getCollection('foods').aggregate([
  {
    // Agrupa os documentos por categoria
    $group: {
      _id: "$category.name",       // Agrupa pelo campo 'category.name'
      total: { $sum: 1 }           // Conta o número de documentos em cada grupo
    }
  },
  {
    // Projeta os campos 'category' e 'total' na ordem correta
    $project: {
      _id: 0,                      // Exclui o campo '_id' da saída
      category: "$_id",            // Inclui 'category' a partir de '_id'
      total: "$total"              // Inclui 'total' mantendo seu valor
    }
  },
  {
    // Ordena os resultados pelo campo 'total' em ordem decrescente
    $sort: { total: -1 }
  }
])

// 03

db.getCollection('foods').aggregate([
  {
    // Agrupa os documentos por categoria
    $group: {
      _id: "$category.name",       // Agrupa pelo campo 'category.name'
      total: { $sum: 1 }           // Conta o número de documentos em cada grupo
    }
  },
  {
    // Conta o número total de categorias distintas
    $count: "categories"          // Cria um campo 'categories' que contém a contagem total
  }
])

// 04

db.getCollection('foods').aggregate([
  {
    // Filtra os documentos onde a categoria é "Verduras, hortaliças e derivados" e a descrição contém "cozido"
    $match: {
      "category.name": "Verduras, hortaliças e derivados",
      "description": { $regex: /cozido/i }  // Usa regex para encontrar "cozido" na descrição, ignorando maiúsculas e minúsculas
    }
  },
  {
    // Projeta os campos desejados na saída
    $project: {
      _id: 0,                      // Exclui o campo '_id' da saída
      id: "$id",                   // Inclui o campo 'id'
      description: "$description"  // Inclui o campo 'description'
    }
  },
  {
    // Ordena os documentos pela 'description' em ordem alfabética
    $sort: { description: 1 }
  }
])

