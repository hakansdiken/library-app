import express from 'express';
import { UserRepository } from '../domain/user/user.repository.js';
import { UserService } from '../domain/user/user.service.js';
import { UserValidator } from '../domain/user/user.validator.js';
import { UserApplication } from '../application/user.application.js';

const router = express.Router();
const userRepository = new UserRepository();
const userValidator = new UserValidator();
const userService = new UserService(userRepository, userValidator);
const userApplication = new UserApplication(userService);

router.post('/register', async (req, res) => {

    const userData = req.body;

    try {

        const result = await userApplication.register(userData);

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }

});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const result = await userApplication.login(email, password);

        if (!result.success) {

            const statusCode = result.message === "User not found!" ? 404 : 400;

            return res.status(statusCode).json(result);
        }

        req.session.regenerate(err => {
            if (err) {

                return res.status(500).json({
                    success: false,
                    message: 'An error occurred during login.',
                });
            }

            req.session.userId = result.data.id;
            req.session.role = result.data.role;

            res.status(200).json(result);
        });


    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/logout', (req, res) => {

    if (!req.session.userId) {

        return res.status(200).json({
            success: true,
            message: 'You are already logged out.',
        });
    }

    req.session.destroy(err => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: 'An error occurred during logout.',
            });
        }

        res.clearCookie('connect.sid');

        return res.status(200).json({
            success: true,
            message: 'Logout successful.',
        });
    });
});

router.get('/me', (req, res) => {

  if (!req.session?.userId) {

    return res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: req.session.userId,
      role: req.session.role
    }
  });
});

export default router;
