const {ApolloServer} = require('apollo-server-express');
const express = require("express");
const mongoose = require("mongoose");
const bodypaser = require('body-parser');
const app = express();
const cors = require('cors');
const typeDefs= require("./apollo/typeDef");
const resolvers = require("./apollo/resolvers")
app.use(cors())
app.use(bodypaser.json())


const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({app});
  

mongoose.connect("mongodb+srv://username:pass@cluster0.hvitz.mongodb.net/app",{ useNewUrlParser: true,useUnifiedTopology: true })
        .then(res=>{
          
        })
        .catch(err=>{
            console.log(err)
        })