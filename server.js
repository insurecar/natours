const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

//console.log(app.get('env')); //we can find out in wich mode we are
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
