import mongoose from 'mongoose';

const containerSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
        unique : true
    },
    container_number: {
        type: String,
        required: true,
        unique: true
    },
    voyage_id: {
        type: String,
        required: true,
        ref: 'Voyage'
    },
    destination: {
        type: String,
        required: true,
    },
    due_date: {
        type: String,
        required: true
    },
    late_charge: {
        type: Number,
        required: true
    },
    arrived_on: {
        type: String,
        default: null
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export default mongoose.model('Container', containerSchema);