import { Roles } from "../../domain/constants/roles.js";

export function authorize(allowedRoles) {

    return (req, res, next) => {

        const userRole = req.session?.role;

        if (!userRole) {

            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        if (!allowedRoles.includes(userRole)) {

            return res.status(403).json({ success: false, message: "Forbidden: Access denied." });
        }

        next();
    };
}