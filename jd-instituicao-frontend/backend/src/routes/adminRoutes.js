const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Users
router.get('/users', adminController.getUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.put('/users/:id/toggle-status', adminController.toggleUserStatus);
router.delete('/users/:id', adminController.deleteUser);

// Messages
router.get('/messages', adminController.getMessages);
router.put('/messages/:id/status', adminController.updateMessageStatus);
router.delete('/messages/:id', adminController.deleteMessage);

// Blog
router.get('/blog/posts', adminController.getBlogPosts);

// Recruitment
router.get('/jobs', adminController.getJobs);
router.get('/applications', adminController.getApplications);

// Portfolio & Testimonials
router.get('/portfolio', adminController.getPortfolio);
router.get('/testimonials', adminController.getTestimonials);

// Gallery
router.get('/gallery', adminController.getGallery);
router.post('/gallery', adminController.createGalleryImage);
router.put('/gallery/:id', adminController.updateGalleryImage);
router.delete('/gallery/:id', adminController.deleteGalleryImage);

// Subscribers
router.get('/subscribers', adminController.getSubscribers);

module.exports = router;
