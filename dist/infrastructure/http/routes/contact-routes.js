"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/http/routes/user-routes.ts
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const contact_controller_1 = require("../controllers/contact-controller");
const router = (0, express_1.Router)();
router.post('/', contact_controller_1.CreateContact);
router.get('/', auth_1.authenticate, contact_controller_1.GetAllContacts);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'SUPER_ADMIN']), contact_controller_1.DeleteContact);
exports.default = router;
