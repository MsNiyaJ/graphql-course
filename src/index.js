import { GraphQLServer } from "graphql-yoga";

// 5 Scalar Types: String, Boolean, Int, Float, ID      (A type that stores a single value)
// (!) - Indicates this query is mandatory
// All type definitions start with a capital letter

// Demo user data
const users = [
    {id: 1, name: 'Shaniya', email: 'Shaniya@email.com', age: 22},
    {id: 2, name: 'Karen', email: 'beepbop@email.com'},
    {id: 3, name: 'Plankton', email: 'secretformula@email.com'},
]

// Demo post data
const posts = [
    {id: 1, title: "Hey", body: "Hello World!", published: true},
    {id: 2, title: "Goodbye", body: "Goodbye World!", published: true},
    {id: 3, title: "Im back", body: "Hello Again", published: false}
]

// Type definition schema
const typeDefs = `
    type Query{
       users(query: String): [User!]! 
       posts(query: String): [Post!]!
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
        users(parent, args, ctx, info){
            if(!args.query){
                return users;
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }, 

        posts(parent, args, ctx, info){
            if(!args.query){
                return posts;
            }

            // Filters all posts with a query string that matches the title or post
            return posts.filter((post) => {
                let titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                let postMatch = post.body.toLowerCase().includes(args.query.toLowerCase()) 
                return titleMatch || postMatch
            })

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