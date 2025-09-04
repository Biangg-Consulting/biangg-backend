"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubscriptions = exports.createSubscription = void 0;
const prisma_1 = require("../../infrastructure/database/prisma");
const createSubscription = async (subscriptionData) => {
    try {
        if (!subscriptionData.email) {
            throw new Error('Email is required');
        }
        const existingSubscription = await prisma_1.prisma.subscription.findUnique({
            where: { email: subscriptionData.email }
        });
        if (existingSubscription) {
            return {
                success: false,
                message: 'Email already subscribed'
            };
        }
        const subscription = await prisma_1.prisma.subscription.create({
            data: {
                email: subscriptionData.email,
                name: subscriptionData.name,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        return { success: true, subscription };
    }
    catch (error) {
        console.error('Subscription creation error:', error);
        return { success: false, message: 'Subscription failed' };
    }
};
exports.createSubscription = createSubscription;
const getAllSubscriptions = async (pagination) => {
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const [total, subscriptions] = await Promise.all([
        prisma_1.prisma.subscription.count(),
        prisma_1.prisma.subscription.findMany({
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' }
        })
    ]);
    return {
        data: subscriptions,
        pagination: {
            total,
            totalPages: Math.ceil(total / pageSize),
            page,
            pageSize
        }
    };
};
exports.getAllSubscriptions = getAllSubscriptions;
