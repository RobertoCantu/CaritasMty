import usersRoutes from '../src/routes/usersroutes.js';
import ticketsRoutes from '../src/routes/ticketsroutes';
import app from './MiddleWares/app.js';
import config from './config'

//Routes
app.use(usersRoutes);
app.use(ticketsRoutes);


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
})