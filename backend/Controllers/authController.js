const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const dotenv = require('dotenv');
const Teacher = require('../Models/Teacher');
const Parent = require('../Models/Parent');
const Admin = require('../Models/Admin');


dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET // || 'super_secret_key';
const TOKEN_EXPIRES_IN = '7d'; // Or '1d', '7d' as needed

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
};

// Register (admin-only feature)
// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();

//     const token = generateToken(user);
//     res.status(201).json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err.message });
//   }
// };
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists in User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this email' });
    }

    // Check if the user exists in the respective profile collection
    let profileModel;
    if (role === 'teacher') profileModel = Teacher;
    else if (role === 'parent') profileModel = Parent;
    else if (role === 'admin') profileModel = Admin;
    else return res.status(400).json({ message: 'Invalid role' });

    const profile = await profileModel.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: `No ${role} profile found with this email` });
    }

    if (profile.user) {
      return res.status(400).json({ message: 'User account already registered for this profile' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user account
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await user.save();

    // Link the User ID to the profile
    profile.user = savedUser._id;
    await profile.save();

    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Get profile (user ID from custom header)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from route params

    if (!userId) return res.status(400).json({ message: 'User ID missing in parameters' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    let roleDetails = null;

    const role = user.role.toLowerCase();
    if (role === 'admin') {
      roleDetails = await Admin.findOne({ user: user._id }).select('-user');
    } else if (role === 'teacher') {
      roleDetails = await Teacher.findOne({ user: user._id }).select('-user');
    } else if (role === 'parent') {
      roleDetails = await Parent.findOne({ user: user._id }).select('-user');
    }

    if (!roleDetails) {
      return res.status(404).json({ message: `${user.role} details not found` });
    }

    res.json({
      user,
      profile: roleDetails
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
};
