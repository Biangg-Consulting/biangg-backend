"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllBookings = exports.CreateBooking = void 0;
const booking_service_1 = require("@/application/services/booking-service");
const CreateBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const result = await (0, booking_service_1.createBooking)(bookingData);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.CreateBooking = CreateBooking;
const GetAllBookings = async (req, res) => {
    try {
        if (req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPER_ADMIN') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const result = await (0, booking_service_1.getAllBookings)({ page, pageSize });
        res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get bookings',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.GetAllBookings = GetAllBookings;
