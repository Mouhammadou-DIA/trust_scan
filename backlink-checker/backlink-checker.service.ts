import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class BacklinkCheckerService {
  async checkBacklinks(url: string): Promise<any> {
    try {
      const apiKey = process.env.SERPAPI_KEY;
      
      const domain = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')[0];
      
      const params = {
        engine: 'google',
        q: `link:${domain}`,
        api_key: apiKey,
        num: 100
      };
      
      const { data } = await axios.get('https://serpapi.com/search.json', { params });
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
    } catch (error) {
      return this.fallbackBacklinkCheck(url);
    }
  }

  private async fallbackBacklinkCheck(url: string): Promise<any> {
    return {
      targetUrl: url,
      totalBacklinks: 0,
      referringDomains: 0,
      note: 'Backlink check skipped (requires SERPAPI_KEY)',
      outboundLinks: []
    };
  }
}
