const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: (parentValue, args) =>
        axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(resp => resp.data),
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyId: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve: (parentValue, args) =>
        axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) =>
        axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data),
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) =>
        axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      description: 'Add user to database',
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve: (parentValue, args) =>
        axios
          .post('http://localhost:3000/users', {
            firstName: args.firstName,
            age: args.age,
          })
          .then(resp => resp.data),
    },
    deleteUser: {
      type: UserType,
      description: 'Remove user from database',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parentValue, args) =>
        axios
          .delete(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data),
    },
    editUser: {
      type: UserType,
      description: 'Update user detials',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: (parentValue, args) =>
        axios
          .patch(`http://localhost:3000/users/${args.id}`, args)
          .then(resp => resp.data),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
