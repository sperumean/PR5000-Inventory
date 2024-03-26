import Equipment from "../models/equipmentModel.js";
import mongoose from "mongoose";

//POST
export const createEquipment = async (request, response) => {
  const { title, image, description, price, availability, draft } =
    request.body;

  try {
    const equipment = await Equipment.create({
      title,
      image,
      description,
      price,
      availability,
      draft,
    });
    response.status(201).json(equipment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

//GET by ID
export const getEquipment = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(400).json({ error: "Invalid equipment ID" });
    return;
  }

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      response.status(404).json({ error: "Equipment not found" });
      return;
    }
    response.status(200).json(equipment);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

//GET All
export const getAllEquipments = async (request, response) => {
  try {
    const equipments = await Equipment.find();
    response.status(200).json(equipments);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

//DELETE by ID
export const deleteEquipment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Equipment not found" });
  }
  const equipment = await Equipment.findOneAndDelete({ _id: id });
  if (!equipment) {
    return res.status(404).json({ error: "Equipment not found" });
  }
  res.status(200).json(equipment);
};

// PUT
export const updateEquipment = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Equipment not found" });
  }

  try {
    const equipment = await Equipment.findOneAndUpdate(
      { _id: id },
      { ...request.body }
    );

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    response.status(200).json(equipment);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
