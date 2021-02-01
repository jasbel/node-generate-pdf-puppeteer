// require('dotenv').config();

const app = require('./server');

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`)
});