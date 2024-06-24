import Tour from "../models/Tours.js";

// create a new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create" });
  }
};

//update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update" });
  }
};

// delete  tour

export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deletedTour,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete" });
  }
};

// getSingle tour

export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const singleTour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: singleTour,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};

// get all tours

export const getAllTours = async (req, res) => {
  //  for pagination
  const page = parseInt(req.query.page);

  try {
    const allTours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: allTours.length,
      message: "Successfully fetched",
      data: allTours,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};

// get tour by search
export const getTourBySearch = async (req, res) => {

  // here 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than equal
    const tours = await Tour.find({
      city: city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully fetched", 
      data: tours, 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch", error: error });
  }
};

// get featured tour

export const getFeaturedTours = async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: featuredTours,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};

// get tour counts

export const getTourCounts = async (req, res) => {
  try {
    const tourCounts = await Tour.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: tourCounts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};
