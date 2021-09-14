import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from 'uuid';

// Demo user data
const users = [
    {id: 1, name: 'Shaniya', email: 'Shaniya@email.com', age: 22, comments: '315'},
    {id: 2, name: 'Karen', email: 'beepbop@email.com', comments: '317'},
    {id: 3, name: 'Plankton', email: 'secretformula@email.com', comments: '318'},
]

// Demo post data
const posts = [
    {id: 1, title: "Hey", body: "Hello World!", published: true, author: '1', comments: '315'},
    {id: 2, title: "Goodbye", body: "Goodbye World!", published: true, author: '2', comments: '317'},
    {id: 3, title: "Im back", body: "Hello Again", published: false, author: '3', comments: '318'}
]

// Demo comment data
const comments = [
    {id: 315, text: "You look amazing!", author: '1', post: '1'},
    // {id: 316, text: "Look another comment!", author: '1'},
    {id: 317, text: "And another one!", author: '2', post: '2'},
    {id: 318, text: "The formula will be mine!", author: '3', post: '3'}
]

// Type definition schema
const typeDefs = `
    type Query{
       users(query: String): [User!]! 
       posts(query: String): [Post!]!
       comments: [Comment!]!
       me: User! 
       post: Post!  
    }

    type Mutation{
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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

        comments(parent, args, ctx, info){
            return comments
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
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email == args.email)
            if(emailTaken){
                throw new Error('This email is taken');
            }
            
            const user = {
                id: uuidv4(),   //Randomly generates an id
                name: args.name,
                email: args.email, 
                age: args.age
            }

            users.push(user)    // Add this new user to the users array
            return user
        },
        createPost(parent, args, ctx, info){
            const userExists = users.some((user) => user.id == args.author)
            if(!userExists){
                throw new Error('User not found');
            }

            const post = {
                id: uuidv4(),   //Randomly generates an id
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post);
            return post
        },
        createComment(parent, args, ctx, info) { 
            const userExists = users.some((user) => user.id == args.author)
            if(!userExists){
                throw new Error('User not found');
            }

            const postExists = posts.some((post) => post.id == args.post)
            if(!postExists){
                throw new Error('Post not found');
            }

            const comment = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            comments.push(comment)
            return comment
        }
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id == parent.author
            })
        }, 
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.id == parent.comments
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return post.author == parent.id
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comments) => {
                return comments.id == parent.comments;
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id == parent.author
            })
        }, 
        post(parent, args, ctx, info){
            return posts.find((post) => {
                return post.id == parent.post
            })
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