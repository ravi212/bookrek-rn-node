import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
router.post('/register', async (req, res) => {
    console.log(req.body)
  try {

    const  {email, password, username}  = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    if (username.length < 3) {
        return res.status(400).json({ msg: 'Username must be at least 3 characters' });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
    } else {   
        const profileImage = `https://ui-avatars.com/api/?name=${username}&background=random`;
        const newUser = new User({ email, password, username, profileImage });
        await newUser.save();
        const token = generateToken(newUser._id);
        res.status(201).json({ token, user: { _id: newUser._id, email, username, profileImage }, msg: 'User registered successfully' });
    }

  } catch (error) {
    console.log("Error in register route", error);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }   
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }   
    const token = generateToken(user._id);
    res.status(200).json({ token, user: { _id: user._id, email, username: user.username, profileImage: user.profileImage }, msg: 'User logged in successfully' });
    } catch (error) {       
    console.log("Error in login route", error);
    res.status(500).send('Server error');
  } 
});

export default router;