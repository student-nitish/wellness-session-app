const Session = require('../models/Session');
const mongoose = require('mongoose');
const User=require("../models/User");

//  Get all published sessions (public)
exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' }).populate('user_id', 'email');
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//  Get logged-in user's sessions
exports.getMySessions = async (req, res) => {
  
  try {
    const sessions = await Session.find({ user_id: req.user.id}).populate('user_id');
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//  Get single session by ID (must belong to user)
exports.getMySessionById = async (req, res) => {
  try {
    console.log("session id", req.params.id);
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//Save or update a draft session
exports.saveDraftSession = async (req, res) => {
  try {
    const { sessionId, title, tags, json_content} = req.body;
    const payload = {
      title,
      tags: tags || [],
      json_content,
      status: 'draft',
      user_id: req.user.id,
    };

    let session;

    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: req.user.id },
        { ...payload, updated_at: new Date() },
        { new: true }
      );
    } else {
      session = await Session.create(payload);
    }

    res.status(200).json({ success: true, data: session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//  Publish a session
exports.publishSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.user.id },
      { status: 'published', updated_at: new Date() },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found or unauthorized' });
    }

    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
