db.alunos.insertMany([
{
 nome: "Fernando",
 idade: "30"
 },
 {
 valor:2.5,
 peso:5.5
 }
])

db.alunos.find()

db.users.drop()
db.users.insertMany([
  {
    nome: "Pedro",
    idade: 25,
	genero: "M"
  },
  {
    nome: "Ana",
    idade: 20,
	genero: "F" 
  },
  {
    nome: "Maria",
    idade: 21,
	genero: "F" 
  },
  {
    nome: "Lucas",
    idade: 28,
	genero: "M" 
  },
  {
    nome: "João",
    idade: 22,
	genero: "M" 
  },
  {
    nome: "Renata",
    idade: 24,
	genero: "F" 
  },
  {
    nome: "Paulo",
    idade: 23,
	genero: "M" 
  },
  {
    nome: "Bruna",
    idade: 27,
	genero: "F" 
  },
  {
    nome: "Irene",
    idade: 20,
	genero: "F" 
  },
  {
    nome: "Roberto",
    idade: 21,
	genero: "M" 
  },
  {
    nome: "Yuri",
	genero: "M" 
  }
])

db.users.find()
db.users.find({})
db.users.find({},{})
//Listando os campos nome e idade de todos os documentos
db.users.find({},{nome:true,idade:true,_id:false})
//Listando os campos nome e idade de todos os documentos
db.users.find({},{nome:1, idade:1,_id:0})
//Listando os campos nome e idade do documento que possui nome Paulo
db.users.find(
	{nome:"Paulo"},
	{nome:true,idade:true,_id:false}
)
//Listando os campos nome e idade do documento que possui idade > 25
db.users.find(
	{idade:{$gt:25}},
	{nome:true,idade:true,_id:false}
)
//Listando os campos nome e idade do documento que possui idade > 25 ou =< 23
db.users.find(
{
	$or:[
		{idade:{$gt:25}},
		{idade:{$lte:23}},
	]
},
	{nome:true,idade:true,_id:false},
	
	{
		sort:{idade:1},
	}
		
)
