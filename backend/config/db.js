import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://sakshishahare03:YjwkssJATGLIALPF@cluster0.8y5iubg.mongodb.net/lets-food')
    .then(()=> console.log("DB connected"));
}