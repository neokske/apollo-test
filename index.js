const { ApolloServer, gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Persoon {
    voornaam: String
    achternaam: String
  }

  type Query {
    hello: String
    poef: String
    persoon: [Persoon]
    createPersoon(voornaam: String, achternaam: String): Persoon
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
    hello: (root, args, context) => 'Hello world!',
    poef: () => 'Ik doe maar iets',
    persoon: () => personen,
    createPersoon: (root, { voornaam, achternaam }, context) => {
      const user = {
        voornaam,
        achternaam,
      };
      personen.push(user);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
