const {connect} = require('mongoose');

const {database} = require('./keys');

(async () => {
    const db = await connect(database.URI);
    console.log('DB is connected:', db.connection.name);
})()