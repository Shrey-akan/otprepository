import mongoose from "mongoose";

export const dbConnection = async (URI) => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connecting to db");
  }
};
