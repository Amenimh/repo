
const cors = require('cors');
const express = require('express');;
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');


app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})


  

const generateRandomID = (max, min) => {
 return Math.floor(Math.random() * (max - min) + min)}




    app.get('/info', (request, response) => {
      Person.find({})
      .then((people) => {
        response.send(
          `<p>Phonebook has info for ${
            people.length
          } people</p><p>${new Date()}</p>`
        );
      })
   
      })
      

  

      app.get('/api/persons', (request, response) => {
        Person
          .find({})
          .then(persons => {
          response.json(persons)
        });
        
      })
      

      app.get('/api/persons/:id', (request, response, next) => {
     Person.findById(request.params.id)
     .then(person => {
        if(person) {
            response.json(person)
        }else{
            response.status(404).end()
        }
      })
      .catch(error => next(error))
      })


      app.delete('/api/persons/:id', (request, response, next) => {
         Person.findByIdAndDelete(request.params.id).then(() => {
          response.status(204).end()
        })
        .catch(error => next(error))
        
      })


      app.post('/api/persons', (request, response, next) => {
          const body = request.body
          
          const person =  new Person({
            //id: generateRandomID(92830,33),
            name: body.name,
            number: body.number

        })


       /*if (persons.find(p => p.name === person.name)){
          return response.status(400).json({
              error: 'name must be unique' })
        }*/
        if (body.name=== undefined || body.number === undefined) {
          return response.status(400).json({
            error: 'name or number missing'
          })
        }
       
      console.log(`${person}  personnn `);

        person.save().
        then(savedPerson => {
          response.json(savedPerson)
          console.log("Person is saved");

      }).catch(error => next(error))
    })


    app.put('/api/persons/:id', (request, response, next) => {
      const { name, number } = request.body
      console.log("bodyyy");
    
      console.log(request.params.id);
      Person.findByIdAndUpdate(request.params.id, {name, number}, { new: true , unValidators: true  ,context: 'query'})
        .then(updatedPerson => {
          response.json(updatedPerson)
        }).catch(error => next(error))
    })

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }
    
    app.use(unknownEndpoint)
    const errorHandler = (error, request, response, next) => {
      console.error(error.message)
    
      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
      next(error)
    }
    
    // tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
    app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servesr running on port ${PORT}`)
})
