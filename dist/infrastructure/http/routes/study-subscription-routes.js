"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const study_subscription_controller_1 = require("../controllers/study-subscription-controller");
const router = (0, express_1.Router)();
router.post('/', study_subscription_controller_1.CreateStudySubscription);
router.get('/', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'SUPER_ADMIN']), study_subscription_controller_1.GetAllStudySubscriptions);
exports.default = router;
