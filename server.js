const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'static')));


const {userRouters} = require('./routers/userRouters');
const {categoryRouters} = require('./routers/categoryRouters');
const {productRouters} = require('./routers/productRouters');
const {cartRouters} = require('./routers/cartRouters');
const {cartItemRouters} = require('./routers/cartItemRouters');


app.get('/', (req, res) => {
  res.send('Hello World!');
});




userRouters(app);
categoryRouters(app);
productRouters(app);
cartRouters(app);
cartItemRouters(app);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});