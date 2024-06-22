const express = require('express');
const { getAstrologers, toggleAstrologer, createAstrologer, deleteAstrologer } = require('../controllers/astrologersController');
const astrologersRouter = express.Router();
const {isAuthenticate, isAdmin} = require('../utils/auth');

astrologersRouter.get('/', isAuthenticate, getAstrologers);
astrologersRouter.post('/', [isAuthenticate, isAdmin], createAstrologer);
astrologersRouter.put('/:id/toggle', [isAuthenticate, isAdmin], toggleAstrologer);
astrologersRouter.delete('/:id', [isAuthenticate, isAdmin], deleteAstrologer);

module.exports = astrologersRouter;
