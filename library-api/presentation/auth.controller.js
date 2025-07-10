import express from 'express';
import { UserRepository } from '../domain/user/user.repository.js';
import { UserService } from '../domain/user/user.service.js';

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.post('/register', async (req, res) => {

    const userData = req.body;

    try {

        const result = await userService.register(userData);

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: error.message });
    }

});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const result = await userService.login(email, password);

        if (!result.success) {

            return res.status(400).json(result);
        }

        res.status(200).json(result);
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
