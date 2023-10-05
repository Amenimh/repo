const cors = require('cors')
const express = require('express')
const app = express()
const morgan = require('morgan')


app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})



   let persons = [
      { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456",
        
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
      
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        
      }
    ]
  

const generateRandomID = (max, min) => {
 return Math.floor(Math.random() * (max - min) + min)}




    app.get('/info', (req, res) => {
        const amount = persons.length
        const date = new Date()
        res.send(`<p>Phonebook has info for ${amount} people </p><p> ${date} </p>
       `)
      })
      

  

      app.get('/api/persons', (req, res) => {
        res.json(persons)
      })
      

      app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        console.log(id);
        const person = persons.find(person => person.id === id)
        if(person) {
            response.json(person)
        }else{
            response.status(404).end()

        }
      })


      app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
      })


      app.post('/api/persons', (request, response) => {
          const body = request.body
          const person = {
            id: generateRandomID(92830,33),
            name: body.name,
            number: body.number

        }
          if (persons.find(p => p.name === person.name)){
            return response.status(400).json({
                error: 'name must be unique' })
          }
          if (!body.name || !body.number) {
            return response.status(400).json({
              error: 'name or number missing'
            })
          }
          
        
       
       persons =  persons.concat(person)
        response.json(persons)
      })



const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
