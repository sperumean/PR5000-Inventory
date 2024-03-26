import Reservation from "../models/reservationModel.js";
import mongoose from "mongoose";

//POST
export const createReservation = async (request, response) => {
  const { title, image, date, price, reservation_status, equipment_id } =
    request.body;

  try {
    const user_id = request.user._id;
    const user_name = request.user.email;
    const reservation = await Reservation.create({
      title,
      image,
      date,
      price,
      reservation_status,
      equipment_id,
      user_name,
      user_id,
    });
    response.status(201).json(reservation);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

//GET by ID
export const getReservation = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(400).json({ error: "Invalid reservation ID" });
    return;
  }

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      response.status(404).json({ error: "Reservation not found" });
      return;
    }
    response.status(200).json(reservation);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

//GET All
export const getAllReservations = async (request, response) => {
  try {
    let reservations;
    let user_id = request.user._id;
    let userRole = request.user.role;
    if (userRole === "admin") {
      reservations = await Reservation.find().sort({ createdAt: -1 });
    } else if (userRole === "user") {
      reservations = await Reservation.find({ user_id }).sort({
        createdAt: -1,
      });
    }
    response.status(200).json(reservations);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

//DELETE by ID
export const deleteReservation = async (req, res) => {

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  const reservation = await Reservation.findOneAndDelete({ _id: id });
  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  res.status(200).json(reservation);
};

// PUT
export const updateReservation = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Reservation not found" });
  }

  try {
    const reservation = await Reservation.findOneAndUpdate(
      { _id: id },
      { ...request.body },
      { new: true } // Add this option to return the updated reservation
    );

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    response.status(200).json(reservation);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
