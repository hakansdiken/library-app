import { Roles } from "../../domain/constants/roles.js";

/**
 * @param {string[]} allowedRoles - Allowed roles.
 * @param {boolean} allowSelf - Access for yourself control.
 */
export function authorize(allowedRoles = [], allowSelf = false) {

    return (req, res, next) => {

        const userId = req.session?.userId;
        const userRole = req.session?.role;
        const requestedId = req.params?.id;
        
        if (!userRole) {

            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        if (allowedRoles.includes(userRole)) {

            return next();
        }

        if (allowSelf && userId === requestedId) {

            return next();
        }

        return res.status(403).json({ success: false, message: "Forbidden: Access denied." });
    };
}
