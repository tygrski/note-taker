const express = require('express');
const apiRoutes = require('/routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')
const app = express();

const PORT = process.envPORT || 3001; 

// tells if initializing express, we can with json
app.use(express.json());
// should be ale to read url coming in, extended:  part enables us to be able to do queries
app.use(express.urlencoded({extended: true}));
// use contents of spublic folder
app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log (`App istening at PORT ${PORT}`);
});