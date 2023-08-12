import { BikeService } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { ApiResponse } from '@app/response';
export declare class BikeController {
    private readonly bikeService;
    constructor(bikeService: BikeService);
    getAllBikes(): Promise<ApiResponse<any>>;
    getBikeById(encryptedId: string): Promise<ApiResponse<any>>;
    createBike(payload: CreateBikeDto): Promise<ApiResponse<any>>;
    updateBike(encryptedId: string, payload: UpdateBikeDto): Promise<ApiResponse<any>>;
    deleteBike(encryptedId: string): Promise<ApiResponse<any>>;
}
