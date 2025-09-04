"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllStudySubscriptions = exports.CreateStudySubscription = void 0;
const study_subscription_service_1 = require("@/application/services/study-subscription-service");
const CreateStudySubscription = async (req, res) => {
    try {
        const subscriptionData = req.body;
        const result = await (0, study_subscription_service_1.createStudySubscription)(subscriptionData);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create study subscription',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.CreateStudySubscription = CreateStudySubscription;
const GetAllStudySubscriptions = async (req, res) => {
    try {
        if (req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPER_ADMIN') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const result = await (0, study_subscription_service_1.getAllStudySubscriptions)({ page, pageSize });
        res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get study subscriptions',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.GetAllStudySubscriptions = GetAllStudySubscriptions;
