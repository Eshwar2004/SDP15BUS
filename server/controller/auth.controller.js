import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, 'Email already exists'));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password, role } = req.body;

    try {
        // Find the user by email
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, validUser.password);

        if (!isPasswordValid) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }

        // Check if the provided role matches the user's role
        if (role !== validUser.role) {
            return next(errorHandler(401, 'Wrong role selected!'));
        }

        // Generate a JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Exclude the password from the response
        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};
