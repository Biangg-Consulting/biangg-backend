"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const subscription_controller_1 = require("../controllers/subscription-controller");
const router = (0, express_1.Router)();
router.post('/', subscription_controller_1.CreateSubscription);
router.get('/', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'SUPER_ADMIN']), subscription_controller_1.GetAllSubscriptions);
exports.default = router;
