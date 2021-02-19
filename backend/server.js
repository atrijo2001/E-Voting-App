const express = require('express');
const dotenv = require('dotenv')
const connectDb = require('./config/DB')
const morgan = require('morgan')

const userRoutes = require('./routes/user')
const candidateRoutes = require('./routes/candidate')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

dotenv.config()
const app = express();
app.use(express.json())


const PORT = process.env.PORT || 5000;

connectDb()
app.get('/', (req, res) => {
    res.send("Henlo")
})

app.use('/api/users', userRoutes)
app.use('/api/candidate', candidateRoutes)


app.use(notFound)
app.use(morgan)
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`.green.italic))