const express = require("express")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const {getUsersByGender} = require('./controllers/UserControllers')



const app = express()
require("dotenv").config({  path: "./.env"})
require("./config/database.js")


app.use(morgan('dev'))
app.use(bodyParser.json())
// Tous les users
app.get('/api/users', require("./routes/UserRoute.js"))
// Un user a travers son id 
app.get('/api/users/id/:id', require("./routes/UserRoute.js"))
// les users a travers leurs sexe
app.get('/api/users/genre', getUsersByGender)

// le nombre de user dans notre jeu de donnée
app.get('/api/users/stats/total', require('./routes/UserRoute.js'))

// La masse salairiale des users
app.get('/api/users/stats/sum', require('./routes/UserRoute.js'))

// Le nombre de users de sexe masculin ou le nombre de user de see feminin 
app.get('/api/users/stats/count', require('./routes/UserRoute'))

// Supprimer un user a travers son id 
app.delete('/api/users/:id', require("./routes/UserRoute.js"))

// Ajouter un user 
app.post("/api/users/add", require("./routes/UserRoute.js"))

// Modifier un user
app.put("/api/users/:id", require("./routes/UserRoute.js"))





app.listen(process.env.PORT, () =>{
    console.log("Notre application est demarrée sur : http://localhost:"+process.env.PORT)
})