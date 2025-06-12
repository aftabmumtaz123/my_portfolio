import express from "express";
import session from "express-session";
import flash from "express-flash";
import nodemailer from "nodemailer";
import 'dotenv/config';
import Contact from "./models/contact.js";

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(
  session({
    secret: "infinite zone",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import connection from './config/connection'
import "./config/connection.js";



app.get("", (req, res) => {
  res.render("index", { messages: req.flash() });
});






app.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, 
    subject: `New message from ${name}: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      req.flash('error', 'Something went wrong. Please try again.');
      return res.redirect('/');
    } else {
      console.log('Email sent:', info.response);
      req.flash('success', 'Your message has been sent!');
      res.redirect('/');
    }
  });
});








app.listen(3000, () => {
  console.log(`App is running on port ${3000}`);
});
