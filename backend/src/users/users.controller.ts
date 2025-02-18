import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthRoleGuard } from '../auth/auth-role.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/role.enum';

@Controller('users')
export class UsersController {
  @UseGuards(AuthRoleGuard)
  @Get('profile')
  getProfile() {
    return 'This is the user profile';
  }

  @UseGuards(AuthRoleGuard)
  @Roles(Role.Manager)
  @Get('admin')
  getAdminPanel(@Request() req: any) {
    console.log(req.user);
    return 'This is the admin panel, managers only';
  }
}
