"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinkCheckerService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let BacklinkCheckerService = class BacklinkCheckerService {
    async checkBacklinks(url) {
        try {
            const apiKey = process.env.SERPAPI_KEY;
            const domain = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')[0];
            const params = {
                engine: 'google',
                q: `link:${domain}`,
                api_key: apiKey,
                num: 100
            };
            const { data } = await axios_1.default.get('https://serpapi.com/search.json', { params });
            const results = data.organic_results || [];
            const backlinks = results.map(result => ({
                url: result.link,
                title: result.title,
                snippet: result.snippet,
                domain: new URL(result.link).hostname
            }));
            const uniqueDomains = [...new Set(backlinks.map(b => b.domain))];
            return {
                targetUrl: url,
                totalBacklinks: backlinks.length,
                referringDomains: uniqueDomains.length,
                backlinks: backlinks.slice(0, 50),
                domains: uniqueDomains.slice(0, 20)
            };
        }
        catch (error) {
            return this.fallbackBacklinkCheck(url);
        }
    }
    async fallbackBacklinkCheck(url) {
        return {
            targetUrl: url,
            totalBacklinks: 0,
            referringDomains: 0,
            note: 'Backlink check skipped (requires SERPAPI_KEY)',
            outboundLinks: []
        };
    }
};
exports.BacklinkCheckerService = BacklinkCheckerService;
exports.BacklinkCheckerService = BacklinkCheckerService = __decorate([
    (0, common_1.Injectable)()
], BacklinkCheckerService);
//# sourceMappingURL=backlink-checker.service.js.map