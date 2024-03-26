import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "1d",
    });
};

export const loginUser = async (request, response) => {
    const { email, password } = request.body;
    try {
        const { user, role } = await User.login(email, password); 
        const token = generateToken(user._id);
        response.status(200).json({ email, role, token});
    } catch (error) {
        response.status(400).json({ error: error.message });
        console.error(error.message);
    }
};

export const signupUser = async (request, response) => {
    const { email, password, role } = request.body;

    try {
        const user = await User.signup(email, password, role);
        const token = generateToken(user._id);
        response.status(201).json({ email, role: user.role, token });
    } catch (error) {
        response.status(400).json({ error: error.message });
        console.error(error.message);
    }
};