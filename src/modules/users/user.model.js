const mongoose = require("mongoose");
const { USER_STATUS, USER_GENDER, USER_ROLES } = require("./user.constants");

const userSchema = new mongoose.Schema(
  {
    // ==========================================
    // Profile Information
    // ==========================================

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: null,
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: Object.values(USER_GENDER),
      default: null,
    },

    profileImage: {
      type: String,
      default: null,
    },

    // ==========================================
    // Authentication
    // ==========================================

    password: {
      type: String,
      required: true,
      select: false,
    },

    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },

    refreshTokenExpiresAt: {
      type: Date,
      default: null,
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    // ==========================================
    // Account
    // ==========================================

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.PATIENT,
    },

    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    // ==========================================
    // Audit
    // ==========================================

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("User", userSchema);
