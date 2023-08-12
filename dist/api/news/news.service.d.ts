import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';
export declare class NewsService {
    private readonly dbService;
    private readonly security;
    constructor(dbService: PrismaService, security: SecurityService);
    create({ body, title }: CreateNewsDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {})[]>;
    findOne(identity: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {}>;
    update(identity: string, { body, title }: UpdateNewsDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {}>;
    remove(identity: string): Promise<boolean>;
}
