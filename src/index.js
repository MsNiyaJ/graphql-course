import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types: String, Boolean, Int, Float, ID      (A type that stores a single value)
// (!) - Indicates this query is manditory

// Type definition schema
const typeDefs = `
    type Query{
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!    
    }
`

// Resolvers
const resolvers = {
    Query: {
        title(){
            return 'Hunger Games'
        }, 
        price(){
            return 29.99
        },
        releaseYear(){
            return null
        },
        rating(){
            return 4.3
        },
        inStock(){
            return true
        }
    }
}

// Start the servers
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is running');
})