"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatiController = void 0;
const common_1 = require("@nestjs/common");
const fati_service_1 = require("./fati.service");
const swagger_1 = require("@nestjs/swagger");
let FatiController = class FatiController {
    constructor(fatiService) {
        this.fatiService = fatiService;
    }
    async analyze(url) {
        return this.fatiService.analyzeUrl(url);
    }
};
exports.FatiController = FatiController;
__decorate([
    (0, common_1.Get)('analyze'),
    (0, swagger_1.ApiOperation)({ summary: 'Analyze URL for phishing/fake content' }),
    (0, swagger_1.ApiQuery)({ name: 'url', required: true, description: 'URL to analyze' }),
    __param(0, (0, common_1.Query)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FatiController.prototype, "analyze", null);
exports.FatiController = FatiController = __decorate([
    (0, swagger_1.ApiTags)('fati'),
    (0, common_1.Controller)('fati'),
    __metadata("design:paramtypes", [fati_service_1.FatiService])
], FatiController);
//# sourceMappingURL=fati.controller.js.map