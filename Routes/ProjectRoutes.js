const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const mongoose = require('mongoose'); 

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a project
router.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    console.log("New project details",newProject); 
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a shared project by sharedID 
// localhost:5000/api/projects/shared/:shareId
router.get('/shared/:shareId', async (req,res) => {
  console.log("Received shareId : ", req.params.shareId); 
  const project = await Project.findOne({ shareId: req.params.shareId })
  .populate('owner')
  .populate('collaborators.user');

if (!project) return res.status(404).json({ message: 'Project not found' });
console.log(project); 
res.json(project);
});

// Add a collaboator to a project : 
router.post('/:projectId/collaborators', async (req, res) => {
  const {email, role = 'editor'} = req.body ; 
  const {projectId} = req.params ;  
  const requestingUserId = req.body.user_id ;
  try{
    const project = await Project.findById(projectId).populate('owner').populate('collaborators.user') ;
    if(!project) return res.status(404).json({ message: 'Project not found' });

    if(project.owner._id.toString() !== requestingUserId.toString()){
      return res.status(403).json({ message: 'You are not authorized to add collaborators to this project' });
    }

    // Check if the user exists : 
    const userToAdd = await User.findOne({ email }) ;
    if(!userToAdd) return res.status(404).json({ message: 'User not found' });
    // Check if the user is a collaborator already :
    const isAlreadyCollaborator = project.collaborators.some(collaborator => collaborator.user._id.toString() === userToAdd._id.toString()) ;
    if(isAlreadyCollaborator) return res.status(400).json({ message: 'User is already a collaborator' });

    // If everything is okay, we can add the email to collaborator 
    project.collaborators.push({ user:userToAdd._id, role }) ;
    await project.save() ;
    console.log("Collaborator added successfully:", project);
    res.status(200).json({ message: 'Collaborator added successfully' , project});
  }
  catch(error){
    console.log('Error adding collaborator:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 







module.exports = router;


