// controllers/busesController.js


import Buses from '../models/buses.js';

export const createBus = async (req, res) => {
  try {
    const busData = req.body;
    const newBus = new Buses(busData);
    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(500).json({ message: 'Error creating bus', error: error.toString() });
  }
};

export const getBuses = async (req, res) => {
  try {
    const buses = await Buses.find({});
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buses', error: error.toString() });
  }
};

export const getBusById = async (req, res) => {
  try {
    const busId = req.params.id;
    const bus = await Buses.findById(busId);
    if (!bus) {
      res.status(404).json({ message: 'Bus not found' });
    } else {
      res.json(bus);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bus by id', error: error.toString() });
  }
};

export const updateBus = async (req, res) => {
  try {
    const busId = req.params.id;
    const updatedData = req.body;
    const bus = await Buses.findByIdAndUpdate(busId, updatedData, { new: true });
    if (!bus) {
      res.status(404).json({ message: 'Bus not found' });
    } else {
      res.json(bus);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating bus', error: error.toString() });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const busId = req.params.id;
    const deletedBus = await Buses.findByIdAndDelete(busId);
    if (!deletedBus) {
      res.status(404).json({ message: 'Bus not found' });
    } else {
      res.json({ message: 'Bus deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bus', error: error.toString() });
  }
};