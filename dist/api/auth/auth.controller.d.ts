import AuthService from './auth.service';
import { CreateAccountDto, SignInDto } from './dto/auth.dto';
import { ApiResponse } from '@app/response';
declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getCurrentUser(): Promise<any>;
    getLoginnedUser(req: any): Promise<any>;
    createNewUser(user: CreateAccountDto): Promise<ApiResponse<any>>;
    updateUser(user: CreateAccountDto, id: string): Promise<ApiResponse<any>>;
    signInToAccount(request: SignInDto): Promise<any>;
}
export default AuthController;
