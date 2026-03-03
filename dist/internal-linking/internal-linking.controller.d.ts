import { InternalLinkingService } from './internal-linking.service';
export declare class InternalLinkingController {
    private readonly internalLinkingService;
    constructor(internalLinkingService: InternalLinkingService);
    analyze(url: string): Promise<any>;
}
