"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const booking_controller_1 = require("../controllers/booking-controller");
const router = (0, express_1.Router)();
router.post('/', booking_controller_1.CreateBooking);
router.get('/', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'SUPER_ADMIN']), booking_controller_1.GetAllBookings);
exports.default = router;
