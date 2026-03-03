import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class InternalLinkingService {
  async analyze(url: string): Promise<any> {
    try {
      const { data } = await axios.get(url, { timeout: 5000 });
      const $ = cheerio.load(data);

      const internalLinks = [];
      const brokenLinks = [];

      $('a').each((index, element) => {
        const href = $(element).attr('href');
        if (href && (href.startsWith('/') || href.startsWith(url))) {
          internalLinks.push(href);
        }
      });

      const suggestions = this.generateSuggestions(
        internalLinks.length,
        brokenLinks.length,
      );

      return {
        url,
        internalLinksCount: internalLinks.length,
        brokenLinksCount: 0,
        suggestions,
      };
    } catch (error) {
      return {
        url,
        internalLinksCount: 0,
        brokenLinksCount: 0,
        suggestions: ['Unable to analyze internal links'],
      };
    }
  }

  private generateSuggestions(
    internalLinksCount: number,
    brokenLinksCount: number,
  ): string[] {
    const suggestions = [];

    if (internalLinksCount < 10) {
      suggestions.push(
        'Consider adding more internal links to improve site structure.',
      );
    }

    if (brokenLinksCount > 0) {
      suggestions.push(
        'Fix the broken internal links to improve user experience and SEO.',
      );
    }

    return suggestions;
  }
}
