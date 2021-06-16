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
  

mongoose.connect("mongodb+srv://santhosh:santhosh31@cluster0.hvitz.mongodb.net/testApp")
        .then(res=>{
            app.listen(8000,()=>{
                console.log("listening..")
            })
        })
        .catch(err=>{
            console.log(err)
        })


