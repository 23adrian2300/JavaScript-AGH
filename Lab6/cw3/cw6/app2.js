import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { encodeXML } from 'entities';
import cors from 'cors';

const application1 = express();
const application2 = express();
const dirname = path.dirname(fileURLToPath(import.meta.url));

application1.set('views', dirname + '/views');
application1.set('view engine', 'pug');
application1.use(cors());
application1.locals.pretty = application1.get('env') === 'development';
/* ************************************************ */
application2.use(morgan('dev'));
application2.use(express.json());
application2.use(express.urlencoded({ extended: false }));
application2.use(cors());
/* ************************************************ */
application1.get('/', function (request, response) {
    response.render('index');
});

application2.all('/submit', function (req, res) {
    // Return the greeting in the format preferred by the WWW client
    let name = req.method === 'GET' ? req.query.name : req.body.name;
    switch (req.accepts(['html', 'text', 'json', 'xml'])) {
        case 'json':
            res.type('application/json');
            res.json({ welcome: `Hello '${name}'` });
            console.log(`\x1B[32mThe server sent a JSON document to the browser using the '${req.method}' method\x1B[0m`);
            break;
        case 'xml':
            name = name !== undefined ? encodeXML(name) : '';
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
application2.listen(8000, function () {
    console.log('The server was started on port 8000');
});
application1.listen(8001, function () {
    console.log('The server was started on port 8001');
    console.log('To stop the server, press "CTRL + C"');
});