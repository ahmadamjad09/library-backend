import {SetMetadata} from '@nestjs/common'
import { Roles } from 'src/entities/roles.entity'

export const UserRoles = (...roles:number[]) => SetMetadata("roles",roles)