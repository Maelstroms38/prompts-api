const { GraphQLServer } = require('graphql-yoga');
const { Prompts, sequelize } = require('./models');

const typeDefs = `
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

const server = new GraphQLServer({ 
  typeDefs, 
  resolvers,
});

server.start(() => console.log(`Server is running at http://localhost:4000`))