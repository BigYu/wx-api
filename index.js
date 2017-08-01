const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const _ = require('lodash');

let mockEvents = [
  {
    id: "1",
    title: 'Mock event 1',
    startDate: '2017-07-31',
    startTime: '08:00',
    endDate: '2017-07-31',
    endTime: '11:00',
    description: 'This is mock event 1',
    location: {
      latitude: 12.341,
      longitude: 31.414,
      scale: 3,
      name: 'This is mock location 1',
    },
  },
  {
    id: "2",
    title: 'Mock event 2',
    startDate: '2017-07-31',
    startTime: '08:00',
    endDate: '2017-07-31',
    endTime: '11:00',
    description: 'This is mock event 2',
    location: {
      latitude: Math.random() * 50,
      longitude: Math.random() * 50,
      scale: 3,
      name: 'This is mock location 2',
    },
  },
  {
    id: "3",
    title: 'Mock event 3',
    startDate: '2017-07-31',
    startTime: '08:00',
    endDate: '2017-07-31',
    endTime: '11:00',
    description: 'This is mock event 3',
    location: {
      latitude: Math.random() * 50,
      longitude: Math.random() * 50,
      scale: 3,
      name: 'This is mock location 3',
    },
  },
]

const locationType = new graphql.GraphQLObjectType({
  name: 'Location',
  fields: {
    latitude: { type: graphql.GraphQLString },
    longitude: { type: graphql.GraphQLString },
    scale: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString},
  },
});

const eventType = new graphql.GraphQLObjectType({
  name: 'Event',
  fields: {
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    startDate: { type: graphql.GraphQLString },
    startTime: { type: graphql.GraphQLString },
    endDate: { type: graphql.GraphQLString },
    endTime: { type: graphql.GraphQLString },
    descriptino: { type: graphql.GraphQLString },
    location: { type: locationType },
  },
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    event: {
      type: eventType,
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve(parent, {id}) {
        return _.find(mockEvents, {id});
      }
    },
  }
});


const mutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createEvent: {
      type: eventType,
      args: {
        title: {
          description: 'The title of the event',
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        }
      },
      resolve(parent, { title }) {
        const newId = _.size(mockEvents).toString();
        mockEvents.push({ title, id: newId });

        return _.find(mockEvents, { id: newId });
      }
    },
  },
});

const schema = new graphql.GraphQLSchema({ query: queryType, mutation: mutationType })

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);
