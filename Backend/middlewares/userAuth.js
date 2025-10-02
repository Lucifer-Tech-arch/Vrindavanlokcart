import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('username email');

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    req.user = user || null; // ✅ now you can use req.user._id and req.user.username
    next();
  } catch (error) {
    console.log(error);
    req.user = null
  }
};

export default authUser;
