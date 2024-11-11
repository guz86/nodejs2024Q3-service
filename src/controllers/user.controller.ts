import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/dto/update-password.dto';
import { UserService } from 'src/services/user.service';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: string) {
        this.validateUUID(id);
        return this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updatePassword(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
        this.validateUUID(id);
        return this.userService.updatePassword(id, updatePasswordDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('id') id: string) {
        this.validateUUID(id);
        this.userService.deleteUser(id);
    }

    private validateUUID(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid ID format');
        }
    }
}
