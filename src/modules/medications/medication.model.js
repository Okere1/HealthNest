const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    dosage: {
      type: String,
      required: true,
      trim: true,
    },

    frequency: {
      type: String,
      enum: [
        "Once Daily",
        "Twice Daily",
        "Three Times Daily",
        "Weekly",
        "Monthly",
        "Custom",
      ],
      default: "Once Daily",
    },

    reminderTime: [
      {
        type: String,
      },
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    instructions: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Paused"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Medication", medicationSchema);
