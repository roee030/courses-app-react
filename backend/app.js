require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api_gateway');
const dbTables = require('./database_layer');

const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.log(`request parsing error - ${err}`);
    res.sendStatus('500');
});

for (let routerName in routes) {
    const router = routes[routerName];
    app.use('', router);
}

init();

async function init() {
    addProcessEvents();
    await dbTables.init();
    await app.listen(port);
    console.log(`app is listening on port - ${port}`);
}

function addProcessEvents() {
    process.on('uncaughtException', async (error) => {
        console.log(`caught uncaught exception, shutting down - ${error}`);
        await dbTables.deinit();
    });
    process.on('unhandledRejection', async (error) => {
        console.log(`caught unhandled rejection, shutting down - ${error}`);
        await dbTables.deinit();
    });
    process.on('SIGTERM', async () => {
        console.log('received shutdown signal, shutting down');
        await dbTables.deinit();
    });
}