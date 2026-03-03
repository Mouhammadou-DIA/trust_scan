import { FatiService } from './fati.service';
export declare class FatiController {
    private readonly fatiService;
    constructor(fatiService: FatiService);
    analyze(url: string): Promise<any>;
}
