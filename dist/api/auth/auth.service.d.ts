import { PrismaService } from '../../prisma.service';
import { CreateAccountDto, SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../security/security.service';
declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly security;
    constructor(prismaService: PrismaService, jwtService: JwtService, security: SecurityService);
    getCurrentUser(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        email: string;
        full_name: string;
        password: string;
        address: string;
        token: string;
        role: import(".prisma/client").RoleAccount;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    createAccount(payload: CreateAccountDto): Promise<{
        email: string;
        name: string;
        address: string;
    }>;
    updateAccount(id: string, payload: CreateAccountDto): Promise<{
        email: string;
        name: string;
        address: string;
    }>;
    signIn({ email, password }: SignInDto): Promise<{
        id: number;
        email: string;
        full_name: string;
        password: string;
        address: string;
        token: string;
        role: import(".prisma/client").RoleAccount;
        createdAt: Date;
        updatedAt: Date;
        access_token: string;
    }>;
    validateUserById(userId: number): Promise<import("@prisma/client/runtime").GetResult<{
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
export default AuthService;
