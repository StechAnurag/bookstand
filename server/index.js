const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connecting to mongoDB
mongoose.connect(`mongodb+srv://rest-shopkeeper:${process.env.MONGO_ATLAS_PASWD}@rest-shop-lwh6s.mongodb.net/bookstand?retryWrites=true&w=majority`, {useNewUrlParser : true})
  .then(()=> console.log('connected to mongodb'))
  .catch(err => console.log(err));

// use express-graphql as middleware on a single route
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));


const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`app is listening on port:${port}`));
