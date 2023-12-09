const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const port = process.env.PORT || 5001;
const cors = require('cors');
app.use(cors());

//using middleware to parse json data
app.use(express.json());

require('./db/conn');
app.use('/', require('./routes/UserRoutes'));
app.use('/request', require('./routes/RequestRoutes'));

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
