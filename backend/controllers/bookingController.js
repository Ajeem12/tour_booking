import Booking from "../models/Booking.js";

// create a new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Successfully Booking saved",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get booking
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};

// get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};
