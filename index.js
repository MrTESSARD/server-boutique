const PORT = 4000
const express = require('express')
const cors = require('cors')
const router = express()
const mongoDBClient = require('./mongoClient')

//API Rest
const Product = require('./models/product')
router.get('/products', async (req, res) => {
  const product = await Product.find({})
  try {
    res.send(product)
    
  } catch (error) {
    res.status(500).send(err)
    
  }
})
router.get('/products/:category', async (req, res) => {
  const category = req.params.category
  const product = await Product.find({category})
  try {
    res.send(product)
    
  } catch (error) {
    res.status(500).send(err)
    
  }
})

router.use(cors())

router.get('/', (req, res) => {
  res.send('Hello Express! 🎉 ')
})



router.listen(PORT, () => {
  console.log(`Example router listening on PORT ${PORT} `)
  mongoDBClient.initialize()
})