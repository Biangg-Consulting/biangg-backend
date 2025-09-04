"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContact = exports.GetAllContacts = exports.CreateContact = void 0;
const contact_service_1 = require("@/application/services/contact-service");
const CreateContact = async (req, res) => {
    try {
        const contactData = req.body;
        if (!contactData.email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        const result = await (0, contact_service_1.contactUser)(contactData);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Create contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create contact',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.CreateContact = CreateContact;
const GetAllContacts = async (req, res) => {
    try {
        if (req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPER_ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const paginationOptions = {
            page,
            pageSize
        };
        const result = await (0, contact_service_1.getAllContacts)(paginationOptions);
        res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    }
    catch (error) {
        console.error('Get all contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get contacts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.GetAllContacts = GetAllContacts;
const DeleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        await (0, contact_service_1.deleteContact)(contactId, req.user.role);
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete contact error:', error);
        const status = error.message.includes('Unauthorized') ? 403 :
            error.message.includes('not found') ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message || 'Failed to delete contact'
        });
    }
};
exports.DeleteContact = DeleteContact;
