db.foods.countDocuments()

/* 01 - Comando para listar a descrição e a quantidade de calorias dos alimentos que são da categoria Leite e derivados. */
db.getCollection('foods').aggregate([
    {
        $match: { "category.name": "Leite e derivados" }  
    },
    {
        $project: {
            _id: 0,
            description: "$description",
            calories: "$energy.value"
        }
    },
    {
        $sort: { calories: -1 }
    }
])

/* 02 Fazer um comando para listar a quantidade de alimentos por categorias na coleção foods. Apresente o resultado em ordem decrescente de quantidades e com os campos. */
db.getCollection('foods').aggregate([
    {
        $group: {
            _id: "$category.name",
            total: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            category: "$_id",
            total: "$total"
        }
    },
    {
        $sort: { total: -1 }
    }
])

/* 03 - – Alterar o comando do Exercício 2 para listar a quantidade de documentos do resultado. Apresente o resultado. */
db.getCollection('foods').aggregate([
    {
        $group: {
            _id: "$category.name",
            total: { $sum: 1 }
        }
    },
    {
        $count: "categories"
    }
])

/* 04 - Fazer um comando para listar, na coleção foods, todos os alimentos da categoria Verduras, hortaliças e derivados que possuem o termo cozido na descrição. Apresente o resultado em ordem alfabética de descrição e com os campos.
*/
db.getCollection('foods').aggregate([
    {
        $match: {
            "category.name": "Verduras, hortaliças e derivados",
            "description": { $regex: /cozido/i }
        }
    },
    {
        $project: {
            _id: 0,
            id: "$id",
            description: "$description"  
        }
    },
    {
        $sort: { description: 1 }
    }
])
