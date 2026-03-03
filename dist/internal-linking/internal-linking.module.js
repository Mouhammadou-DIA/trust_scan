"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalLinkingModule = void 0;
const common_1 = require("@nestjs/common");
const internal_linking_service_1 = require("./internal-linking.service");
const internal_linking_controller_1 = require("./internal-linking.controller");
let InternalLinkingModule = class InternalLinkingModule {
};
exports.InternalLinkingModule = InternalLinkingModule;
exports.InternalLinkingModule = InternalLinkingModule = __decorate([
    (0, common_1.Module)({
        providers: [internal_linking_service_1.InternalLinkingService],
        controllers: [internal_linking_controller_1.InternalLinkingController],
        exports: [internal_linking_service_1.InternalLinkingService],
    })
], InternalLinkingModule);
//# sourceMappingURL=internal-linking.module.js.map