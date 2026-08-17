import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default:0
    }
});

export const Counter = mongoose.model('Counter', counterSchema);

export async function getNextId(prefix) {
    const counter = await Counter.findByIdAndUpdate(
        prefix,
        { $inc: {seq: 1} },
        {new: true, upsert: true}
    );
    return `${prefix}${counter.seq}`;
}
