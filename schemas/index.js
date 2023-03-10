const graphql=require("graphql")
const Product=require("../models/product")
const Order=require("../models/order")

const {//types des propriétées
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt

}=graphql

//on crée un objet de produit avec des champs demandés par le client
const ProductType = new GraphQLObjectType({//4
  name:'Product',
  fields:()=>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    category:{type:GraphQLString} ,
    filter:{type:GraphQLString},
    price:{type:GraphQLFloat}
  })

})

const ProductInputType = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      category: { type: GraphQLString },
      filter: { type: GraphQLString },
      price: { type: GraphQLFloat },
      quantity: { type: GraphQLInt },
      size: { type: GraphQLString },
  })
})



const OrderType = new GraphQLObjectType({//4
  name:'Order',
  fields:()=>({
    id:{type:graphql.GraphQLID},
    ownerId:{type:GraphQLString},
    date:{type:GraphQLString} ,
    pickupDate:{type:GraphQLString},
    clientDetails:{type:GraphQLString},
    total:{type:GraphQLFloat},
    items:{type:GraphQLList(ProductType)},
  })

})

//Le root de type RootQueryType
const RootQuery = new GraphQLObjectType({//2
  name: 'RootQueryType',
      fields: {
        hello: {//type de requête
          type: GraphQLString,
          resolve() {
            return 'Hello GraphQL';
          },
        },
        products:{//type de requête demande de produit par objet aves des paramètres demandés par client
          type:new GraphQLList(ProductType),//3
          resolve(parent, args){
            return Product.find()
          }
          

        },
        products:{//type de requête demande de produit par objet aves des paramètres demandés par client
          type:new GraphQLList(ProductType),//
          args: {category : { type: GraphQLString}},
          resolve(parent, args){
            return Product.find({category: args.category})
          }
          

        }
      },
    })
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrder: {//type de requête
      type: OrderType,
      args:{
        id:{type:GraphQLID},
        ownerId:{type:GraphQLString},
        date:{type:GraphQLString} ,
        pickupDate:{type:GraphQLString},
        clientDetails:{type:GraphQLString},
        total:{type:GraphQLFloat},
        items:{type:GraphQLList(ProductInputType)}
      },

      
      resolve(parent, args) {
        let order = new Order({
            id: args.id,
            ownerId: args.ownerId,
            date: args.date,
            pickupDate: args.pickupDate,
            clientDetails: args.clientDetails,
            total: args.total,
            items: args.items
        });
        return order.save()
    },
},
},
})



//le Schema de demande d 'objet RootQueryType
var schema = new GraphQLSchema({
    query: RootQuery,//1
    mutation: Mutation
     
  });

  module.exports=schema