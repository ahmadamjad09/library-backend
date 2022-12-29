import { Injectable,CanActivate,ExecutionContext } from "@nestjs/common";
import {Reflector} from "@nestjs/core"
import { Role } from "src/enums/enums";
import jwt_decode from 'jwt-decode'
@Injectable()
export class Admin_Authorization_Guard implements CanActivate {
    constructor(private reflector:Reflector) {}

    canActivate(context:ExecutionContext):boolean {
        // const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles",[
        //     context.getHandler(),
        //     context.getClass()
        // ])
        const requiredRoles = Role

        const request = context.switchToHttp().getRequest()
        // let token = request.rawHeaders[1]
        let index
        for(let i = 0;i<request.rawHeaders.length;i++) {
            if(request.rawHeaders[i] == 'Authorization') {
                index = i+1
                break;
            }
        }
        let token = request.rawHeaders[index]
        console.log("token",request.rawHeaders[index])
        let decoded:any = jwt_decode(token)
        if(requiredRoles) {
            // return requiredRoles.includes(decoded.role_id)
            return requiredRoles.ADMIN == decoded.role_id
        } else {
            return false
        }
    }
}

export class Admin_Author_Authorization_Guard implements CanActivate {
    constructor(private reflector:Reflector) {}

    canActivate(context:ExecutionContext):boolean {
        // const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles",[
        //     context.getHandler(),
        //     context.getClass()
        // ])
        const requiredRoles = Role

        const request = context.switchToHttp().getRequest()
        // let token = request.rawHeaders[1]
        let index
        for(let i = 0;i<request.rawHeaders.length;i++) {
            if(request.rawHeaders[i] == 'Authorization') {
                index = i+1
                break;
            }
        }
        let token = request.rawHeaders[index]
        console.log("token",request.rawHeaders[index])
        let decoded:any = jwt_decode(token)
        if(requiredRoles) {
            // return requiredRoles.includes(decoded.role_id)
            return requiredRoles.ADMIN == decoded.role_id || requiredRoles.AUTHOR == decoded.role_id
        } else {
            return false
        }
    }
}

export class AUth_Guard implements CanActivate {
    constructor(private reflector:Reflector) {}

    canActivate(context:ExecutionContext):boolean {
        // const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles",[
        //     context.getHandler(),
        //     context.getClass()
        // ])
        const requiredRoles = Role

        const request = context.switchToHttp().getRequest()
        let index
        for(let i = 0;i<request.rawHeaders.length;i++) {
            if(request.rawHeaders[i] == 'Authorization') {
                index = i+1
                break;
            }
        }
        let token = request.rawHeaders[index]
        console.log("token",request.rawHeaders[index])
        let decoded:any = jwt_decode(token)
        if(requiredRoles) {
            // return requiredRoles.includes(decoded.role_id)
            return requiredRoles.ADMIN == decoded.role_id || requiredRoles.AUTHOR == decoded.role_id || requiredRoles.CUSTOMER == decoded.role_id
        } else {
            return false
        }
    }
}