import AuthService from './auth.service';
import { Strategy } from 'passport-jwt';
declare const AuthStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthStrategy extends AuthStrategy_base {
    private readonly service;
    constructor(service: AuthService);
    validate(payload: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        email: string;
        full_name: string;
        password: string;
        address: string;
        token: string;
        role: import(".prisma/client").RoleAccount;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
export {};
