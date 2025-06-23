import { buildSchema } from 'graphql';

const schema = buildSchema(`
    
    type User {
        id: ID,
        username: String,
        email: String,
        age: Int,
        posts: [Post]
    }
    type Post {
        id: ID,
        title: String,
        content: String 
    }
    
    input UserInput {
        id: ID,
        username: String!,
        email: String!,
        age: Int,
        posts: [PostInput]
    } 
    input PostInput {
        id: ID,
        title: String!,
        content: String! 
    }
    
    type Query {
        getAllUsers: [User],
        getUser(id: ID): User
    }
    
    type Mutation {
        createUser(input: UserInput): User 
    }
`);

// инпуты - это мутации для создания новых объектов
// квери - это запросы
// фрагменты - это переиспользуемые части квери

export default schema;
