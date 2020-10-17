const express = require("express");
const bodyParser = require("body-parser");

const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphqlDate,GraphQLFloat, GraphQLGEOGRAPHY, GraphQlPoint, graphql } = require('graphql');
const { GraphQLDateTime, GraphQLTime } =  require("graphql-iso-date");
const app = express();
const db = require("./models");

const positions = db.positions;
const devices = db.devices;


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(() => {
    console.log("database connected");
  });



  const deviceType = new GraphQLObjectType({
    name: 'device',
    fields: {
      id: {
        type: GraphQLInt,
      },
      name: {
        type: GraphQLString,
        allownull: false
      },
      uniqueid: {
          type: GraphQLDateTime
      },
      lastupdate: {
        type:GraphQLDateTime,
  
      },
      positionid: {
        type: GraphQLInt,
      },
      groupid: {
        type: GraphQLInt,
      },
      attributes: {
        type:GraphQLString,
      },
      phone: {
        type: GraphQLString,
      },
      model: {
        type: GraphQLInt,
      },
      contact: {
        type:GraphQLInt,
      },
      category: {
        type: GraphQLInt,
      },
  }
})

const locationtype = new GraphQLObjectType({
  name: 'location',
  fields: () => ({
   
    latitude: {
      type: GraphQLFloat,
    },
    longitude: {
      type: GraphQLFloat,
    }
  })
})

  const positionType = new GraphQLObjectType({
    name: 'position',
    fields: {
      id: {
        type: GraphQLInt,

      },
      protocol: {
        type: GraphQLString
      },
      deviceid: {
        type: GraphQLString,
      },
      servertime: {
        type: GraphQLDateTime,

      }, 
      devicetime: {
        type: GraphQLDateTime,
  
      },
      fixtime: {
        type: GraphQLString,

      },
      valid: {
        type:GraphQLString,
      },
      latitude: {
        type: GraphQLFloat,
      },
      longitude: {
        type: GraphQLFloat,
      },
      altitude: {
        type: locationtype ,
        resolve: (data) => {
          return data
        }
      },  
      speed: {
        type:GraphQLFloat,
      },
      course: {
        type:GraphQLFloat,
      },
      address: {
        type: GraphQLString,
       
      },
      attributes: {
        type: GraphQLString,
  
      },
      accuracy: {
        type:GraphQLFloat,
        
      }, 
      network: {
        type: GraphQLString,
      },
    },
  })
  
  
  
  const rootquery = new GraphQLObjectType({
    name: 'Query',
    fields: {
      position: {
        type: positionType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (source, { id }) => {
          return positions.findByPk(id)
        },
      },
      positions: {
        type: new GraphQLList(positionType),
        resolve: (position) => {
          return positions.findAll({})
        },
      },
      devices: {
        type: new GraphQLList(deviceType),
        resolve: (device) => {
          return devices.findAll({})
        },
      },
  
    },
  })
  
  

  const schema = new GraphQLSchema({
    query: rootquery
  })
  
  
  
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
  )
  






//***************************************************************************************************************** */
//API TO INSERT DATA

app.post("/position" , (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    point = { type: 'Point', coordinates: [req.body.longitude,req.body.latitude]}
    const position = {
      id: req.body.id,
      protocol: req.body.protocol,
      deviceid: req.body.deviceid,
      servertime: req.body.servertime,
      devicetime: req.body.devicetime,
      fixtime: req.body.fixtime,
      valid: req.body.valid,
      deviceid: req.body.deviceid,
      longitude : req.body.longitude,
      latitude : req.body.latitude,
      altitude: point,
      speed: req.body.speed,
      course: req.body.course,
      address: req.body.address,
      attributes: req.body.attributes,
      accuracy: req.body.accuracy,
      network: req.body.network
        };
    

  
    // Save Tutorial in the database
    positions.create(position)
      .then(data => {
        res.send(`User Created with id : ${data.id} and name : ${data.name}`);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });

   })

app.get("/findalluser" , (req, res) => {
 
    positions.findAll({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  })


app.delete("/user/:id", (req, res) => {
   Tutorial.destroy({ where:{id : req.params.id } } )
    .then(num => {
        res.send(`User with id: ${req.params.id} was deleted successfully!`)
      })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});