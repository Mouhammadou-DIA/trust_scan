"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatiModule = void 0;
const common_1 = require("@nestjs/common");
const fati_service_1 = require("./fati.service");
const fati_controller_1 = require("./fati.controller");
const backlink_checker_module_1 = require("../backlink-checker/backlink-checker.module");
const internal_linking_module_1 = require("../internal-linking/internal-linking.module");
let FatiModule = class FatiModule {
};
exports.FatiModule = FatiModule;
exports.FatiModule = FatiModule = __decorate([
    (0, common_1.Module)({
        imports: [backlink_checker_module_1.BacklinkCheckerModule, internal_linking_module_1.InternalLinkingModule],
        providers: [fati_service_1.FatiService],
        controllers: [fati_controller_1.FatiController],
        exports: [fati_service_1.FatiService],
    })
], FatiModule);
//# sourceMappingURL=fati.module.js.map