import { BacklinkCheckerService } from '../backlink-checker/backlink-checker.service';
import { InternalLinkingService } from '../internal-linking/internal-linking.service';
export declare class FatiService {
    private backlinkService;
    private internalLinkService;
    constructor(backlinkService: BacklinkCheckerService, internalLinkService: InternalLinkingService);
    analyzeUrl(url: string): Promise<any>;
    private analyzeUrlStructure;
    private calculateBacklinkScore;
    private calculateInternalLinkScore;
}
