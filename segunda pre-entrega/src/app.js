import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import {__dirname} from './utils.js'
import viewsRouter from './router/views.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/', viewsRouter);


try {
    await mongoose.connect('mongodb+srv://escobarjoaquin2002:okvGqraOuslIpkBi@clustercoderback.osj8i4p.mongodb.net/proyect?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}

app.listen(8080, () => console.log('listen'));