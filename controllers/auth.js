const User = require('../models/User')
const {
  StatusCodes
} = require('http-status-codes')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError
} = require('../errors')


const register = async (req, res) => {

  const user = await User.create({
    ...req.body
  })
  /*  const token = jwt.sign({
     name: user.name,
     id: user._id,
     email: user.email
   }, process.env.JWT_SECRET, {
     expiresIn: "30d"
   }); */
  res.status(StatusCodes.CREATED).json({
    token: user.getToken(),
    user: {
      name: user.getName()
    }
  })
};

const login = async (req, res) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please email and Password')
  }

  const user = await User.findOne({
    email
  })

  if (!user) {
    throw new UnauthenticatedError('User does not found')
  }
  let isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.getToken();

  res.status(StatusCodes.OK).json({
    token,
    user: {
      name: user.name
    }
  })




};

module.exports = {
  register,
  login
};