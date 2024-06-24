import express from "express";
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTours,
  getTourBySearch,
  getFeaturedTours,
  getTourCounts,
} from "../controllers/tourController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new routes
router.post("/", verifyAdmin, createTour);

// update tour
router.put("/:id", verifyAdmin, updateTour);

// delete tour
router.delete("/:id", verifyAdmin, deleteTour);

// get single tours
router.get("/:id", getSingleTour);

// get all tour
router.get("/", getAllTours);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

// get featured tour
router.get("/search/getFeaturedTours", getFeaturedTours);

// get tour counts
router.get("/search/getTourCounts", getTourCounts);

export default router;
