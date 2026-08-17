import mongoose from 'mongoose';

const hopSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    _id: false,
  },
);

const voyageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    vessel_id: {
      type: String,
      required: true,
      ref: "Vessel",
    },
    voyage_number: {
      type: String,
      required: true,
      unique: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PLANNED", "SAILING", "COMPLETED"],
      default: "PLANNED",
    },
    hope: [hopSchema],
    effective_route: {
      type: [String],
      default: [],
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.hops;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export default mongoose.model("Voyage", voyageSchema);