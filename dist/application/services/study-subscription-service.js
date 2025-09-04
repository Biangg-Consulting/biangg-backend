"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudySubscriptions = exports.createStudySubscription = void 0;
const prisma_1 = require("../../infrastructure/database/prisma");
const createStudySubscription = async (subscriptionData) => {
    try {
        if (!subscriptionData.email || !subscriptionData.name || !subscriptionData.contact || !subscriptionData.address) {
            throw new Error('All fields are required except message');
        }
        const studySubscription = await prisma_1.prisma.studySubscription.create({
            data: {
                name: subscriptionData.name,
                email: subscriptionData.email,
                titleStudy: subscriptionData.titleStudy,
                contact: subscriptionData.contact,
                address: subscriptionData.address,
                message: subscriptionData.message,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        return { success: true, studySubscription };
    }
    catch (error) {
        console.error('Study subscription creation error:', error);
        return { success: false, message: 'Study subscription failed' };
    }
};
exports.createStudySubscription = createStudySubscription;
const getAllStudySubscriptions = async (pagination) => {
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const [total, studySubscriptions] = await Promise.all([
        prisma_1.prisma.studySubscription.count(),
        prisma_1.prisma.studySubscription.findMany({
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' }
        })
    ]);
    return {
        data: studySubscriptions,
        pagination: {
            total,
            totalPages: Math.ceil(total / pageSize),
            page,
            pageSize
        }
    };
};
exports.getAllStudySubscriptions = getAllStudySubscriptions;
