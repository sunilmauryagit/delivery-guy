import mongoose from "mongoose";

function connectMongoDB() {
  const db = mongoose
    .connect("mongodb://localhost:27017/deliveryGuyDB")
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log("MongoDB error: ", err));
}

export default connectMongoDB;
