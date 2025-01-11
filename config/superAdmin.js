const User = require('./../models/userModel');

const createSpAdmin = async (req, res, next) => {
  const SAuser = await User.findOne({ role: 'superAdmin' });

  if (SAuser) return;

  //Creating SuperAdmin
  try {
    await User.create({
      name: process.env.SAname,
      email: process.env.SAemail,
      password: process.env.SApassword,
      passwordConfirm: process.env.SApasswordConfirm,
      role: process.env.SArole,
    });

    console.log('🐱‍👤 Super Admin successfully created');
  } catch (err) {
    console.log(`Error in SuperAdmin creation: ${err} `);
  }
};

module.exports = createSpAdmin;
