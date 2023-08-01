import express from 'express';
import morgan from 'morgan';
import path from 'path'; //
import { fileURLToPath } from 'url';  
import { encodeXML } from 'entities';

const application = express();
const dirname = path.dirname(fileURLToPath(import.meta.url)); 

application.set('views', dirname + '/views'); 
application.set('view engine', 'pug');
application.locals.pretty = application.get('env') === 'development';
/* ************************************************ */
application.use(morgan('dev'));
application.use(express.json()); // 
application.use(express.urlencoded({ extended: false }));
/* ************************************************ */
application.get('/', function (request, response) {
    response.render('index');
});

application.all('/submit', function (req, res) {
    let name = req.method === 'GET' ? req.query.name : req.body.name;
    switch (req.accepts(['html', 'text', 'json', 'xml'])) {
        case 'json':
            res.type('application/json');
            res.json({ welcome: `Hello '${name}'` });
            console.log(`\x1B[32mThe server sent a JSON document to the browser using the '${req.method}' method\x1B[0m`);
            break;
        case 'xml':
            name = name !== undefined ? encodeXML(name) : '';
            console.log(name);//
            res.type('application/xml');
            res.send(`<welcome>Hello '${name}'</welcome>`);
            console.log(`\x1B[32mThe server sent an XML document to the browser using the '${req.method}' method\x1B[0m`);
            break;
        default:
            res.type('text/plain');
            res.send(`Hello '${name}'`);
            console.log(`\x1B[32mThe server sent a plain text to the browser using the '${req.method}' method\x1B[0m`);
    }
});
/* ************************************************ */
application.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});