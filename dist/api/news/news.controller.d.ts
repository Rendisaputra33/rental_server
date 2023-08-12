import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiResponse } from '@app/response';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(createNewsDto: CreateNewsDto): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {}>>;
    findAll(): Promise<ApiResponse<(import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {})[]>>;
    findOne(id: string): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {}>>;
    update(id: string, dto: UpdateNewsDto): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        slug: string;
        title: string;
        body: string;
        thumbnail: string;
        created_at: Date;
        updated_at: Date;
    }, unknown, never> & {}>>;
    remove(id: string): Promise<ApiResponse<boolean>>;
}
