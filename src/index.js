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

let userCount = 2;



//Routes
server.get('/users', (req, res, next) => {
    res.setHeader('Content-Type', 'applications/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});

server.get('/users/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'applications/json');
    res.writeHead(200);
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
});

server.post('/users', (req, res, next) => {
    let newUser = req.body;
    userCount++;
    newUser.id = userCount;
    users[newUser.id] = newUser;
    res.setHeader('Content-Type', 'applications/json');
    res.writeHead(200);
    res.end(JSON.stringify(newUser));
});

server.put('/users/:id', (req, res, next) => {
    const updateUser = users[parseInt(req.params.id)];
    const update = req.body;
    for(let field in update) {
        updateUser[field] = update[field]
    }
    res.setHeader('Content-Type', 'applications/json');
    res.writeHead(200);
    res.end(JSON.stringify(updateUser));
});

server.del('/users/:id', (req, res, next) => {
    delete users[parseInt(req.params.id)];
    res.setHeader('Content-Type', 'applications/json');
    res.writeHead(200);
    res.end(JSON.stringify(true));
});

//Start server
server.listen(3000, () => {
    console.log('server on port 3000');
});