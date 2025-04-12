const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

// Add a task
router.post('/', async (req, res) => {
  const newTask = new Task(req.body.text)
  const saved = await newTask.save()
  res.json(saved)
})

// Toggle done
router.put(`/toggle/:id`, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  task.done = !task.done
  const updated = await task.save()
  res.json(updated)
})

// Delete a task
router.delete('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  await Task.findByIdAndDelete(req.params.id)
  .then(() => {
    res.json('Successful')
  })
  .catch((err) => {
    console.error('Error deleting task:', err)
  })
})


module.exports = router
