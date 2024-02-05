const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();

//TODO
const schema = {}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, ({ url }) => console.log(`Server running @ ${url}` ));
