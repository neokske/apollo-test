const { ApolloServer, gql } = require('apollo-server');
const TodosApi = require('./TodosApi');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Persoon {
    voornaam: String
    achternaam: String
  }

  type Todo {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    hello: String
    poef: String
    persoon: [Persoon]
    createPersoon(voornaam: String, achternaam: String): Persoon
    todos: [Todo]
    todo(id: Int): Todo
  }
`;

const personen = [
  { voornaam: 'Tom', achternaam: 'Engels' },
  { voornaam: 'Koen', achternaam: 'Engels' },
  { voornaam: 'Tinne', achternaam: 'Engels' },
];

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (_root, _args, _context) => 'Hello world!',
    poef: () => 'Ik doe maar iets',
    persoon: () => personen,
    createPersoon: (_root, { voornaam, achternaam }) => {
      const user = {
        voornaam,
        achternaam,
      };
      personen.push(user);
      return user;
    },
    todos: async (_source, _args, { dataSources: { todoAPI } }) =>
      todoAPI.getTodos(),
    todo: async (_source, { id }, { dataSources: { todoAPI } }) =>
      todoAPI.getTodo(id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todoAPI: new TodosApi(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
