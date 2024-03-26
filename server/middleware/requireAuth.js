import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: "Authorization token is missing" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(_id);

    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    request.user = user;
    next();
  } catch (error) {
    console.error("Error with 'requireAuth' function:", error);
    response.status(401).json({ error: "Request rejected" });
  }
};

export default requireAuth;
