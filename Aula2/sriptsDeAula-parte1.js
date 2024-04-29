/*
Para os exercícios a seguir, considere o seguinte documento:
Material de Aula\Aula 2 - Modelagem de dados no MongoDB\exercicio - parte1.txt
*/

// Nomes dos estados:
db.ufs.find(
	{},
	{
		nome:1,
		_id:0
	}
)
//Ao invés de {nome: ''} para {estado: ''}
db.ufs.find(
	{},
	{
		estado:"$nome",
		_id:0
	},
	{
		sort: {nome:1}
	}
)

//Estados do centro-Oeste...
db.ufs.find(
	{
		"regiao.nome": "Centro-Oeste"
	},
	{
		estado:"$nome",
		_id:0
	},
	{
		sort: {nome:1}
	}
)

//Estados do centro-Oeste. 
db.ufs.find(
	{
		"regiao.nome": "Centro-Oeste"
	},
	{
		estado:"$nome",
		_id:0
	},
	{
		sort: {nome:1}
	}
)

// Contando estados de cada regiao
db.ufs.aggregate([
{
	$group:{
		_id:"$regiao.nome",
		quantidade: { $sum: 1}
	}
}
])

// Somando densidade por regiao
db.ufs.aggregate([
{
	$group:{
		_id:"$regiao.nome",
		quantidade: { $sum: "$densidade"}
	}
},
{
	$sort:{
		quantidade: -1
	}
},
{
	$project: {
		quantidade:1,
		nome: 1
	}
}
])

//Contando estados de cada regiao
db.ufs.aggregate([
{
	$group:{
		_id:"$regiao.nome",
		quantidade: { $sum: 1}
	}
},
{
	$sort:{
		quantidade: -1
	}
},
{
	$project: {
		quantidade:1,
		regiao: "$_id",
		_id: 0
	}
}
])

//Regiao com menos de 5 estados
db.ufs.aggregate([
{
	$group:{
		_id:"$regiao.nome",
		quantidade: { $sum: 1}
	}
},
{
	$match: {
		quantidade: {$lt: 5}
	}
},
{

	$sort:{
		quantidade: -1
	}
},
{
	$project: {
		quantidade:1,
		regiao: "$_id",
		_id: 0
	}
}
])