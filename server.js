const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;

const { Prompts, sequelize } = require('./models');

const typeDefs = gql`
  type Prompt { title: String!, id: Int! }
  type Query { prompt: Prompt }
`;

const resolvers = {
  Query: {
    prompt: async () => {
      const prompt = await Prompts.findOne({ 
        order: sequelize.random() 
      });
      return prompt;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema, 
  uploads: false,
  introspection: true,
    playground: {
      endpoint: '/graphql',
      settings: {
        "editor.theme": "light"
      }
  }
});

const app = express();
const server = createServer(app);
apolloServer.applyMiddleware({ app })
app.use(bodyParser.json())
app.use(cors())

server.listen({ port: PORT }, () => {
    console.log(`Express server listening on port ${PORT}`);
});