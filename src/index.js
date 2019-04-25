const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}]

const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
      link: (_, args) => links.find(link => link.id === args.id)
    },
    Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
    },
    Mutation: {
      post: (_, args) => {
        const link = {
          id: `link-${links.length}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
      }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`server is running on http://localhost:4000 🚀`))