const express = require("express");
const router = express.Router();
const {Task} = require("../models/Task");

router.get('/tasks', async (req, res) => {
    try {
      const { email } = req.body;
      const tasks = await Task.find({email}); // Fetch tasks for the specific user
      res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: error});
    }
  });

module.exports = router