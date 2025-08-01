import express from 'express';
import { UserRepository } from '../domain/user/user.repository.js';
import { UserService } from '../domain/user/user.service.js';
import { authorize } from '../infrastructure/middlewares/authorize.middleware.js';
import { Roles } from '../domain/constants/roles.js';
import { UserApplication } from '../application/user.application.js';
import { UserValidator } from '../domain/user/user.validator.js'

const router = express.Router();
const userRepository = new UserRepository();
const userValidator = new UserValidator();
const userService = new UserService(userRepository, userValidator);
const userApplication = new UserApplication(userService);

router.get('/', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const { page = 1, limit = 10 } = req.query;

        const result = await userApplication.getAllUsers(page, limit);

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/', authorize([Roles.ADMIN]), async (req, res) => {

    try {

        const currentUserRole = req.userRole;
        const userData = req.body;

        const result = await userApplication.createUser(userData, currentUserRole);

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }
}
);


router.get('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN], true), async (req, res) => {

    try {

        const result = await userApplication.getUserById(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.put('/:id', authorize([Roles.ADMIN], true), async (req, res) => {

    try {

        const result = await userApplication.updateUser(req.params.id, req.body)

        if (!result.success) {

            return res.status(404).json(result);
        }

        res.status(200).json(result);


    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete('/:id', authorize([Roles.ADMIN]), async (req, res) => {

    try {

        const result = await userApplication.deleteUser(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;