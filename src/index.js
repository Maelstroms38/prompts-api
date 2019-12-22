const { ApolloServer, gql } = require('apollo-server') 
const { Prompts, sequelize } = require('../models');

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Prompt { title: String!, id: ID! }
  type Query { prompt: Prompt }
`;

const resolvers = {
  Query: {
    prompt: async (_, args) => {
      const prompt = await Prompts.findOne({ 
        order: sequelize.random() 
      });
      return prompt;
    },
  },
};

const server = new ApolloServer({
  typeDefs, 
  resolvers,
});

server.listen({port}, () => console.log(`Server is running at http://localhost:${port}`))