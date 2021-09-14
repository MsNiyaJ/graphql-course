import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types: String, Boolean, Int, Float, ID      (A type that stores a single value)
// (!) - Indicates this query is mandatory
// All type definitions start with a capital letter

// Type definition schema
const typeDefs = `
    type Query{
       greeting(name: String, position: String): String!
       add(numbers: [Float!]!): Float!
       grades: [Int!]!
       me: User! 
       post: Post!  
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info){
            if(args.name && args.position){
                return `Hello ${args.name}! You are my favorite ${args.position}`
            }
            console.log(args.name);
            return 'Hello!'
        }, 

        add(parent, args, ctx, info){
            if(args.numbers.length === 0)
                return 0;
            
            return args.numbers.reduce((sum, currentValue) => {
                return sum += currentValue
            }, 0)
        },

        grades(parent, args, ctx, info){
            return [99, 80, 93]
        },

        me(){
            return {
                id: '123098',
                name: 'Priscilla',
                email: 'PZilla@email.com',
                age: null
            }
        },

        post(){
            return {
                id: '11111',
                title: 'My thoughts',
                body: 'Life is a rollercoaster',
                published: false
            }
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