const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const colors = require("colors");
const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(colors.green(`listening to port ${PORT}`));
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })

}

StartServer();
