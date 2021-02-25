const restify = require('restify');
const server = restify.createServer();

//settings
server.use(restify.plugins.acceptParser(server.acceptable)) // Esto le permite a mi servidor que acepte cierto tipo de cabecera
server.use(restify.plugins.queryParser())                   // Esto le permite a mi servidor convertir las querys                
server.use(restify.plugins.bodyParser())                    //Esto le permite a mi servidor entender formatos de tipo JSON

const users = {
    1: {
        name: "Esteban",
        lastname: "Quito"
    },
    2: {
        name: "Bruce",
        lastname: "Buffer"
    }
};

//Routes
server.get('/users', (req, res, next) => {
    res.setHeader('Content-Type', 'applications/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});

//Start server
server.listen(3000, () => {
    console.log('server on port 3000');
});