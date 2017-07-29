const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const locationType = new graphql.GraphQLObjectType({
  name: 'Location',
  fields: {
    latitude: { type: graphql.GraphQLString },
    longitude: { type: graphql.GraphQLString },
    scale: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString, resolve: () => 'test name' },
  },
});

const eventType = new graphql.GraphQLObjectType({
  name: 'Event',
  fields: {
    id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    startDate: { type: graphql.GraphQLString },
    startTime: { type: graphql.GraphQLString },
    endDate: { type: graphql.GraphQLString },
    endTime: { type: graphql.GraphQLString },
    descriptino: { type: graphql.GraphQLString },
    location: { type: locationType },
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    event: { type: eventType, resolve() { return { title: 'this is a test event', id: '99', location: { name: 'this is a location' } } } }
  }
});

const schema = new graphql.GraphQLSchema({ query: queryType })

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);
