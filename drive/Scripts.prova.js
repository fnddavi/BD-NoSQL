db.foods.countDocuments()

/* 01 - Comando para listar a descrição e a quantidade de calorias dos alimentos que são da categoria Leite e derivados.
*/
db.getCollection('foods').aggregate([                      // Agregaa coleção 'foods'
    {
        $match: { "category.name": "Leite e derivados" }  //filtra os documentos onde a categoria é "Leite e derivados"
    },
    {
        $project: {                                  //projeta (seleciona) os campos desejados na saída
            _id: 0,
            description: "$description",
            calories: "$energy.value"               //inclui o campo 'calories' com valor de 'energy.value'
        }
    },
    {
        $sort: { calories: -1 }           //ordena os documentos pelo campo 'calories' em ordem decrescente
    }
])

/* 02 Fazer um comando para listar a quantidade de alimentos por categorias na coleção foods. Apresente o 
resultado em ordem decrescente de quantidades e com os campos no formato
*/
db.getCollection('foods').aggregate([       //agrega a coleção 'foods'
    {
       $group: {                             // Agrupa os documentos por categoria
            _id: "$category.name",              // Agrupa pelo campo 'category.name'
            total: { $sum: 1 }                  // Conta o número de documentos em cada grupo
        }
    },
    {
        $project: {                           // Projeta os campos 'category' e 'total' na ordem correta
            _id: 0,                             // Exclui o campo '_id' da saída
            category: "$_id",                   // Inclui 'category' a partir de '_id'
            total: "$total"                     // Inclui 'total' mantendo seu valor
        }
    },
    {
        $sort: { total: -1 }                  // Ordena os documentos pelo campo 'total' em ordem decrescente
    }
])

/* 03 - – Alterar o comando do Exercício 2 para listar a quantidade de documentos do resultado. Apresente o resultado.
*/
db.getCollection('foods').aggregate([       //agrega a coleção 'foods'
    {
        $group: {                             // Agrupa os documentos por categoria
            _id: "$category.name",              // Agrupa pelo campo 'category.name'
            total: { $sum: 1 }                  // Conta o número de documentos em cada grupo
        }
    },
    {
        $count: "categories"          // Conta o número total de categorias distintas
    }
])

/* 04 - Fazer um comando para listar, na coleção foods, todos os alimentos da categoria Verduras, hortaliças e 
derivados que possuem o termo cozido na descrição. Apresente o resultado em ordem alfabética de descrição e com os 
campos.
*/
db.getCollection('foods').aggregate([       //agrega a coleção 'foods'  
    {
      $match: {     // Filtra os documentos que atendem aos critérios especificados
        "category.name": "Verduras, hortaliças e derivados", // Filtra os documentos onde a categoria é "Verduras, hortaliças e derivados"
        "description": { $regex: /cozido/i } // Filtra os documentos onde a descrição contém o termo "cozido" (case-insensitive)
      }
    },
    {
      $project: {   // Projeta os campos desejados na saída
        _id: 0,     // Exclui o campo '_id' da saída
        id: "$id",  // Inclui o campo 'id' mantendo seu valor
        description: "$description"     // Inclui o campo 'description' mantendo seu valor  
      }
    },
    {
      $sort: { description: 1 }     // Ordena os documentos pelo campo 'description' em ordem alfabética
    }
  ])
