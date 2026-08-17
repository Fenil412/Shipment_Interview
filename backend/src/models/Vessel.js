import mongoose from 'mongoose';

const vesselSchema = new mongoose.Schema({
     _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    vessel_number: {
        type: String,
        required:true
    },
    capacity: {
        type: Number,
        required: true
    }
},
{
    toJSON : {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export default mongoose.model('Vessel', vesselSchema);