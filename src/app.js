import express from "express";
import morgan from "morgan";
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import userRoutes from "./routes/users.routes";
import checkoutRoutes from "./routes/checkouts.routes";
import encuestasRoutes from "./routes/encuestas.routes";
const app = express();
//settings
app.set("port", 4000);
//middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
    credentials: true
    
  };
  
  // Aplicar el middleware CORS a todas las rutas
  app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/encuesta", encuestasRoutes);


export default app;