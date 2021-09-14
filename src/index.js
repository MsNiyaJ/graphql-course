import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types: String, Boolean, Int, Float, ID      (A type that stores a single value)

// Type definition schema
const typeDefs = `
    type Query{
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello(){
            return 'This is my first query!'
        }, 
        name(){
            return 'Shaniya Malcolm'
        },
        location(){
            return 'New York'
        },
        bio(){
            return 'I am a black, beautiful, and intelligent'
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