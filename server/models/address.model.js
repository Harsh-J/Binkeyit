import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    mobile: {
      type: Number,
      required:[true,"Phone number is required"]
    },
    status: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: [true, "User ID is required"],
      validate: {
        validator: mongoose.isValidObjectId,
        message: "Invalid user ID format.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;
