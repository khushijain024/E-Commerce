const express = require("express");
const connectDb = require("./config/db");
const userRoutes = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoutes = require("./routes/order");
const cors = require("cors");
const path = require("path");
const Order = require("./model/order");
const product = require("./model/product");
require("dotenv").config();
const stripe = require("stripe")(`${process.env.SECRET_KEY}`);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDb();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  // http:..localhost:3000
  res.send("Hello ");
});

// console.log(process.env.PUBLISHABLE_KEY);

app.use("/users", userRoutes);
app.use("/products", productRoute);
app.use("/orders", orderRoutes);

// Create a new checkout session
app.post("/create-checkout-session", async (req, res) => {
  const {
    products,
    userId,
    customerName,
    customerContactNumber,
    address,
    pinCode,
  } = req.body;
  // console.log("Pyment products: ", products)

  // Creating line items for the checkout session
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.productName,
      },
      unit_amount: product.productPrice * 100,
    },
    quantity: product.quantity,
  }));

  // Creating a new checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `https://fonik-backend.vercel.app/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://fonik.vercel.app/paymentcancel`,
    metadata: {
      userId,
      customerName,
      customerContactNumber,
      address,
      pinCode,
      productDetails: JSON.stringify(
        products.map((p) => ({ id: p._id, quantity: p.quantity }))
      ),
    },
  });


  res.json({ id: session.id });
  // const order = new Order({
  //     product : products , userId , customerName , customerContactNumber , address , pinCode : +pinCode , transactionId : session.id,  paymentStatus: 'success'
  // });
  // await order.save();
});

// Handle payment success
app.get(`/paymentsuccess`, async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Payment was successful, now retrieve the order details from metadata
      const {
        userId,
        customerName,
        customerContactNumber,
        address,
        pinCode,
        productDetails,
      } = session.metadata;

      // Fetch full product details from your database
      const productDetailsArray = JSON.parse(productDetails);
      const productIds = productDetailsArray.map((p) => p.id);
      const products = await product.find({ _id: { $in: productIds } });

      const orderProducts = products.map((product) => {
        const details = productDetailsArray.find(
          (p) => p.id === product._id.toString()
        );
        return {
          ...product.toObject(),
          quantity: details.quantity,
        };
      });
      const order = new Order({
        product: orderProducts,
        userId,
        customerName,
        customerContactNumber,
        address,
        pinCode: +pinCode,
        transactionId: session_id,
        paymentStatus: "success",
      });
      console.log("Order: ", order);
      await order.save();
      console.log("Its Done.....");
      res.redirect(`https://fonik.vercel.app/paymentsuccess`);
    } else {
      res.redirect(`https://fonik.vercel.app/paymentcancel`);
    }
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on ${port}`);
});
