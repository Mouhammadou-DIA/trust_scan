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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatiService = void 0;
const common_1 = require("@nestjs/common");
const backlink_checker_service_1 = require("../backlink-checker/backlink-checker.service");
const internal_linking_service_1 = require("../internal-linking/internal-linking.service");
let FatiService = class FatiService {
    constructor(backlinkService, internalLinkService) {
        this.backlinkService = backlinkService;
        this.internalLinkService = internalLinkService;
    }
    async analyzeUrl(url) {
        const urlScore = this.analyzeUrlStructure(url);
        const backlinks = await this.backlinkService.checkBacklinks(url);
        const internalLinks = await this.internalLinkService.analyze(url);
        const backlinkScore = this.calculateBacklinkScore(backlinks);
        const internalLinkScore = this.calculateInternalLinkScore(internalLinks);
        const finalScore = urlScore.score * 0.30 +
            backlinkScore * 0.20 +
            internalLinkScore * 0.25;
        const level = finalScore <= 30 ? 'SAFE' :
            finalScore <= 60 ? 'SUSPICIOUS' :
                finalScore <= 80 ? 'DANGEROUS' : 'BLOCKED';
        return {
            url,
            score: Math.round(finalScore),
            level,
            details: {
                urlAnalysis: urlScore,
                backlinks,
                internalLinks,
            },
        };
    }
    analyzeUrlStructure(url) {
        const parsed = new URL(url);
        let score = 0;
        const flags = [];
        if (url.length > 75) {
            score += 15;
            flags.push('URL_TOO_LONG');
        }
        if (parsed.protocol === 'http:') {
            score += 12;
            flags.push('NO_HTTPS');
        }
        if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(parsed.hostname)) {
            score += 20;
            flags.push('IP_ADDRESS');
        }
        if (['xyz', 'tk', 'ml', 'cf', 'ga'].includes(parsed.hostname.split('.').pop())) {
            score += 12;
            flags.push('SUSPICIOUS_TLD');
        }
        return { score, flags };
    }
    calculateBacklinkScore(backlinks) {
        const count = backlinks.totalBacklinks || 0;
        const domains = backlinks.referringDomains || 0;
        if (count === 0)
            return 80;
        if (domains < 10)
            return 60;
        if (domains < 50)
            return 30;
        return 10;
    }
    calculateInternalLinkScore(internalLinks) {
        const broken = internalLinks.brokenLinksCount || 0;
        const total = internalLinks.internalLinksCount || 0;
        if (total === 0)
            return 70;
        if (broken > total * 0.3)
            return 60;
        if (broken > 0)
            return 30;
        return 10;
    }
};
exports.FatiService = FatiService;
exports.FatiService = FatiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [backlink_checker_service_1.BacklinkCheckerService,
        internal_linking_service_1.InternalLinkingService])
], FatiService);
//# sourceMappingURL=fati.service.js.map