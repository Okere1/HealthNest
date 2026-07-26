const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    doctorSpecialty: {
      type: String,
      required: true,
      trim: true,
    },

    doctorName: {
      type: String,
      trim: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    reminderEnabled: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled", "Missed"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
