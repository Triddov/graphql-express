import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createHandler } from "graphql-http/lib/use/express";
import schema from './schema.js';


dotenv.config({path: '.dev.env'});
const APP_PORT = process.env.PORT || 80;
const ANY_USERS_DATA = [{id: 1, username: "Step", email: "123@123.com", age: 20}];

const app = express();

const createUser = (input) => {
    const id = Date.now();
    return { id, ...input }
}

// это резолвер - функция, возвращающая данные конктретной схемы
const root = {
    getAllUsers: () => { return ANY_USERS_DATA },

    getUser: ({id}) => { return ANY_USERS_DATA.find(user => user.id === id) },

    createUser: ({input}) => {
        const user = createUser(input);
        ANY_USERS_DATA.push(user);
        return user;
    }
}


app.use(express.json());
app.use(cors());

app.all('/graphql', createHandler({
    graphiql: true,
    schema,
    rootValue: root
}))


app.listen(APP_PORT, () => console.log(` === Listening on ${APP_PORT}=== `));






