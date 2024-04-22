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

//1

select nome, idade
from users
order by idade desc
db.users.find(
	{},
	{nome:true,idade:true,_id:false}
)
 //2
select nome, idade
from users
where genero = 'F'
order by idade desc
limit 1
offiset 2

db.users.find(
	{genero:"F"},
	{nome:true,idade:true,_id:false},
	{
		sort:{idade:-1},
		limit: 1,
		skip:2
	}
)

//3
select nome, idade
from users
where idade > 15
db.users.find(
	{idade:{$gt:25}},
	{nome:true,idade:true,_id:false},
	
)

//4
select nome, idade
from users
where idade > 21 and idade < 25

db.users.find(
	{
		$and:[
		{
		idade:{$gt:21}
		},
		{
		idade:{$lt:25}
		}
		]
	},
	{nome:true,idade:true,_id:false}
)

select genero, count(*)
from users
group by genero

db.users.aggregate([
  {
    $group:{
      _id:"$genero",
    }
  }

])

db.users.aggregate([{$match},{$group},{$sort}])