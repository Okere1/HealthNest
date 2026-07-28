const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["Medication", "Appointment"],
      required: true,
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    repeat: {
      type: String,
      enum: ["NONE", "DAILY", "WEEKLY", "MONTHLY", "CUSTOM"],
      default: "NONE",
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "TRIGGERED", "TAKEN", "SKIPPED", "MISSED", "CANCELLED"],
      default: "PENDING",
    },

    lastTriggeredAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    acknowledgedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Reminder", reminderSchema);
