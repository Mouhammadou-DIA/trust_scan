import { Injectable } from '@nestjs/common';
import { BacklinkCheckerService } from '../backlink-checker/backlink-checker.service';
import { InternalLinkingService } from '../internal-linking/internal-linking.service';

@Injectable()
export class FatiService {
  constructor(
    private backlinkService: BacklinkCheckerService,
    private internalLinkService: InternalLinkingService,
  ) {}

  async analyzeUrl(url: string): Promise<any> {
    const urlScore = this.analyzeUrlStructure(url);
    const backlinks = await this.backlinkService.checkBacklinks(url);
    const internalLinks = await this.internalLinkService.analyze(url);

    const backlinkScore = this.calculateBacklinkScore(backlinks);
    const internalLinkScore = this.calculateInternalLinkScore(internalLinks);

    const finalScore = 
      urlScore.score * 0.30 +
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

  private analyzeUrlStructure(url: string): any {
    const parsed = new URL(url);
    let score = 0;
    const flags = [];

    if (url.length > 75) { score += 15; flags.push('URL_TOO_LONG'); }
    if (parsed.protocol === 'http:') { score += 12; flags.push('NO_HTTPS'); }
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(parsed.hostname)) { 
      score += 20; flags.push('IP_ADDRESS'); 
    }
    if (['xyz','tk','ml','cf','ga'].includes(parsed.hostname.split('.').pop())) { 
      score += 12; flags.push('SUSPICIOUS_TLD'); 
    }

    return { score, flags };
  }

  private calculateBacklinkScore(backlinks: any): number {
    const count = backlinks.totalBacklinks || 0;
    const domains = backlinks.referringDomains || 0;
    
    if (count === 0) return 80;
    if (domains < 10) return 60;
    if (domains < 50) return 30;
    return 10;
  }

  private calculateInternalLinkScore(internalLinks: any): number {
    const broken = internalLinks.brokenLinksCount || 0;
    const total = internalLinks.internalLinksCount || 0;

    if (total === 0) return 70;
    if (broken > total * 0.3) return 60;
    if (broken > 0) return 30;
    return 10;
  }
}
