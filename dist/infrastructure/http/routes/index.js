"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_routes_1 = __importDefault(require("./document-routes"));
const env_1 = __importDefault(require("../../../config/env"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const admin_routes_1 = __importDefault(require("./admin-routes"));
const user_routes_1 = __importDefault(require("./user-routes"));
const contact_routes_1 = __importDefault(require("./contact-routes"));
const booking_routes_1 = __importDefault(require("./booking-routes"));
const subscription_routes_1 = __importDefault(require("./subscription-routes"));
const study_subscription_routes_1 = __importDefault(require("./study-subscription-routes"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API is running',
        version: 'v1',
        environment: env_1.default.NODE_ENV === 'production' ? 'Production' : 'Development',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
router.use('/documents', document_routes_1.default);
router.use('/auth', auth_routes_1.default);
router.use('/admin', admin_routes_1.default);
router.use('/user', user_routes_1.default);
router.use('/contacts', contact_routes_1.default);
router.use('/subscriptions', subscription_routes_1.default);
router.use('/study-subscriptions', study_subscription_routes_1.default);
router.use('/bookings', booking_routes_1.default);
exports.default = router;
