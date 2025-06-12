import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);


const Contact = mongoose.model("Contacts", contactSchema);
export default Contact;
