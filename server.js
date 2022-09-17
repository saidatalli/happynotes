const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
var expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const noteRoutes = require('./routes/notes')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

// EJS Views
app.use(expressLayouts);
app.set('view engine', 'ejs')

// app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layout/main')



app.use('/notes', express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.use('/notes/editNote', express.static(__dirname + '/public'));
app.use('/notes/createNote', express.static(__dirname + '/public'));
app.use('/notes/deleteNote', express.static(__dirname + '/public'));

// Bodyparser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/notes', noteRoutes)
 

const PORT = process.env.PORT || 1122

app.listen(
  PORT, 
  console.log(`Server is running fast in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
)