const Parent = require('../Models/Parent');

// Create Parent
exports.createParent = async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json(parent);
  } catch (err) {
    res.status(400).json({ message: 'Error creating parent', error: err.message });
  }
};

// Get All Parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find()
      .populate('user', '-password')
      .populate('children', 'name rollNumber class');
    res.json(parents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching parents' });
  }
};

// Get Parent By ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id)
      .populate('user', '-password')
      .populate('children', 'name rollNumber class');
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.json(parent);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching parent' });
  }
};

// Update Parent
exports.updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.json(parent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating parent', error: err.message });
  }
};

// Delete Parent
exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.json({ message: 'Parent deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting parent' });
  }
};
