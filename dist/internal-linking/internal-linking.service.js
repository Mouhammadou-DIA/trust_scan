"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalLinkingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cheerio = require("cheerio");
let InternalLinkingService = class InternalLinkingService {
    async analyze(url) {
        try {
            const { data } = await axios_1.default.get(url, { timeout: 5000 });
            const $ = cheerio.load(data);
            const internalLinks = [];
            const brokenLinks = [];
            $('a').each((index, element) => {
                const href = $(element).attr('href');
                if (href && (href.startsWith('/') || href.startsWith(url))) {
                    internalLinks.push(href);
                }
            });
            const suggestions = this.generateSuggestions(internalLinks.length, brokenLinks.length);
            return {
                url,
                internalLinksCount: internalLinks.length,
                brokenLinksCount: 0,
                suggestions,
            };
        }
        catch (error) {
            return {
                url,
                internalLinksCount: 0,
                brokenLinksCount: 0,
                suggestions: ['Unable to analyze internal links'],
            };
        }
    }
    generateSuggestions(internalLinksCount, brokenLinksCount) {
        const suggestions = [];
        if (internalLinksCount < 10) {
            suggestions.push('Consider adding more internal links to improve site structure.');
        }
        if (brokenLinksCount > 0) {
            suggestions.push('Fix the broken internal links to improve user experience and SEO.');
        }
        return suggestions;
    }
};
exports.InternalLinkingService = InternalLinkingService;
exports.InternalLinkingService = InternalLinkingService = __decorate([
    (0, common_1.Injectable)()
], InternalLinkingService);
//# sourceMappingURL=internal-linking.service.js.map