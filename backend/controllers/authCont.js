const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      // Send welcome email after successful registration
      try {
        await sendEmail({
          to: user.email,
          name: user.name,
          userId: user._id.toString(),
        });
      } catch (emailError) {
        console.error('Registration email failed:', emailError.message);
      }

      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
        message: 'Registration successful',
      });
    }
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      message: 'Server error during registration',
    });
  }
};


const loginUser = async (req,res) => {
    try{
        const { email,password } = req.body;
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))) {
            res.json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id)})
        }
        else res.status(401).json({message: 'Invalid email or pasword'});
    }
    catch(err){
        res.status(500).json({message: 'Server error during login'})
    }
};

const getUserDashboard = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json({message: `Welcome to your secure dashboard, ${user.name}!`,user})
    }
    catch(e) {
        res.status(500).json({
            message: 'Server error fetching profile'
        })
    }
}

module.exports = {registerUser, loginUser, getUserDashboard}