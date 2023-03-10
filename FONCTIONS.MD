## Kill node in Windows
taskkill /im node.exe /F

# .gitignore
touch .gitignore

# Installer et utiliser le mongo shell
homebrew

 brew tap mongodb/brew
instructions docs MongoAtlas

string de connection pr se connecter au mongo shell

db => pr afficher la liste des bd

use <nomdb>

products.find({})


## graphiQL query products + category variable
 {
  products(category: "kids") {
    name
    category
  }
}

# avec query variable :
query productsByCategory($category: String!) {
  products(category: $category) {
    name
    category
  }
}
{
category : "men"
}


## graphqlHTTP interface
http://localhost:4000/graphql

## mutation
mutation{
  addOrder(id: 1, 
    ownerId:"1234", 
    date: "10/03/2023", 
    pickupDate: "12/03/2023",
    clientDetails:"Tim",
  	total:100.50,
    items: [{}])
  {
     clientDetails,
    items{
      name
    }
  }
}