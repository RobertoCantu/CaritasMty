import usersRoutes from '../src/routes/usersroutes.js';
import ticketsRoutes from '../src/routes/ticketsroutes';
import app from './app.js';


//Process env Port process.env.Port 
const port = process.env.PORT || 3001;

//Admin users
const admin = ["juan@caritas.com","lorena@caritas.com","gerardo@caritas.com","sara@caritas.com"];


//Routes
app.use(usersRoutes);
app.use(ticketsRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})