import { BacklinkCheckerService } from './backlink-checker.service';
export declare class BacklinkCheckerController {
    readonly backlinkCheckerService: BacklinkCheckerService;
    constructor(backlinkCheckerService: BacklinkCheckerService);
    getBacklinks(url: string): Promise<any>;
}
