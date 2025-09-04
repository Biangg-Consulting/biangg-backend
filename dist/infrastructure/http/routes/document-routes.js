"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("../middlewares/auth");
const document_controller_1 = require("../controllers/document-controller");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticate, (0, auth_1.authorize)(['ADMIN', 'SUPER_ADMIN']), document_controller_1.uploadDocument);
router.get('/download/:id', (0, cors_1.default)(), document_controller_1.downloadDocument);
router.get('/:id', document_controller_1.getDocument);
router.get('/', document_controller_1.getAllDocuments);
router.put('/:id', auth_1.authenticate, document_controller_1.updateDocument);
router.delete('/:id', auth_1.authenticate, document_controller_1.deleteDocument);
exports.default = router;
