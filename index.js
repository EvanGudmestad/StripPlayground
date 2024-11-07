import express from 'express'
import Stripe from 'stripe'
import cors from 'cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
  res.send(`Hello ${process.env.KEY}`);
})

app.post('/', (req,res) => {
    res.send(`POST! ${process.env.KEY}`);

});

app.post('/checkout', async (req,res) =>{
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price: 'price_1P4k8AEbZVKNzmgrZvPRWr1E',
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000//cancel',
        });
    
        return res.json(session);

      } catch (error) {
        console.error(error);
        throw new Error(`HTTP 500: ${error?.message}`);
    }
    });
    
    
    app.get('/success', (req,res) => {
        return res.send('Success!')
      })
      
      app.get('/cancel', (req,res) => {
        return res.send('Cancel!');
      })
      


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port} `)
})