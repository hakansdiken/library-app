import express from 'express';
import { UserRepository } from '../domain/user/user.repository.js';
import { UserService } from '../domain/user/user.service.js';
import { authorize } from '../infrastructure/middlewares/authorize.middleware.js';
import { Roles } from '../domain/constants/roles.js';

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.get('/', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const result = await userService.getAllUsers();

        if (!result.success) {

            return res.status(500).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN], true), async (req, res) => {

    try {

        const result = await userService.getUserById(req.params.id);

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

        const result = await userService.updateUser(req.params.id, req.body)

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

        const result = await userService.deleteUser(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;