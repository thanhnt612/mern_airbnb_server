import mongoose from 'mongoose'
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB)
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB