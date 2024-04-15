import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// data
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

// resolvers
const resolvers = {
  Query: {
    async games() {
      return Promise.resolve(db.games);
    },
    async game(_, args) {
      return Promise.resolve(db.games.find((game) => game.id === args.id));
    },
    async authors() {
      return Promise.resolve(db.authors);
    },
    async author(_, args) {
      return Promise.resolve(
        db.authors.find((author) => author.id === args.id)
      );
    },
  },

  Mutation: {
    async addGame(_, args) {
      console.log("args add game", args);
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);

      return Promise.resolve({ stt: "success" });
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
