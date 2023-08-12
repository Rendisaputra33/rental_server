export declare class SecurityService {
    private readonly algorithm;
    private secret;
    private readonly iv;
    private readonly key;
    constructor();
    encryptId(id: number): string;
    decryptId(encryptedId: string): number;
}
