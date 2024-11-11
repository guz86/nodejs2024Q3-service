import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/dto/update-password.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updatePassword(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {
        return this.userService.updatePassword(id, updatePasswordDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        this.userService.deleteUser(id);
    }
}
