require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require("express-rate-limit");


//Swagger

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')



const app = express();
//https://www.npmjs.com/package/cors

/* Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help! */
//https://www.npmjs.com/package/helmet

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);


// xss-clean
/* Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params */
app.use(express.json());
app.use(helmet());
app.use(xss())
app.use(cors())
const connectDB = require("./db/connect");

const authRoutes = require("./routes/auth");
const JobsRoutes = require("./routes/jobs");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra packages

// routes
app.get('/', (req, res) => {
  res.send('<h1>Jobs APi</h1> <a href="/api-doc">Api DOC</a>')
})
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", JobsRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();