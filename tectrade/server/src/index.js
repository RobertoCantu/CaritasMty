import usersRoutes from '../src/routes/usersroutes.js';
import ticketsRoutes from '../src/routes/ticketsroutes';
import app from './app.js';
import config from './config'

//Admin users
const admin = ["juan@caritas.com","lorena@caritas.com","gerardo@caritas.com","sara@caritas.com"];


//Routes
app.use(usersRoutes);
app.use(ticketsRoutes);


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
})