const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const url = 'mongodb://127.0.0.1:27017/graphql-server'
const db = mongoose.connection;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

db.once('open', _ => {
    console.log('Database connected:', url);
});
db.once('error', err => {
    console.error('connection error:', err);
});

const app = express();

// allow cross origin request
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(4000, () => console.log("Listening on port 4000..."))