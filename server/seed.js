require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteOne({ email: 'admin@college.edu' });
  await User.create({
    name: 'Office Admin',
    email: 'admin@college.edu',
    password: await bcrypt.hash('PASSWORD2006', 10),
    role: 'admin'
  });
  console.log('Admin created: admin@college.edu / admin123');
  process.exit();
})();