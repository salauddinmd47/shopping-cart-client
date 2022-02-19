const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const products = require('./products')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9yfqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const database = client.db("TrimmerShop");
    const trimmerCollection = database.collection('trimmers')
    
    app.get('/trimmers', async(req, res) => {
       
      const trimmer = trimmerCollection.find({})
      const result = await trimmer.toArray()
      res.json(result)

    }) 
     
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`I am listen ${port}`)
})