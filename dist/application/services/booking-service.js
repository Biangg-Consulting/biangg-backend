"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = exports.createBooking = void 0;
const prisma_1 = require("../../infrastructure/database/prisma");
const createBooking = async (bookingData) => {
    try {
        if (!bookingData.email || !bookingData.name || !bookingData.preferredDate) {
            throw new Error('Email, name and preferred date are required');
        }
        const booking = await prisma_1.prisma.booking.create({
            data: {
                name: bookingData.name,
                email: bookingData.email,
                phone: bookingData.phone,
                preferredDate: bookingData.preferredDate,
                message: bookingData.message || '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        return { success: true, booking, message: 'Booking created successfully' };
    }
    catch (error) {
        console.error('Booking creation error:', error);
        return {
            success: false,
            message: error.message.includes('Unique constraint')
                ? 'Booking already exists'
                : 'Booking creation failed'
        };
    }
};
exports.createBooking = createBooking;
const getAllBookings = async (pagination) => {
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const [total, bookings] = await Promise.all([
        prisma_1.prisma.booking.count(),
        prisma_1.prisma.booking.findMany({
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' }
        })
    ]);
    return {
        data: bookings,
        pagination: {
            total,
            totalPages: Math.ceil(total / pageSize),
            page,
            pageSize
        }
    };
};
exports.getAllBookings = getAllBookings;
