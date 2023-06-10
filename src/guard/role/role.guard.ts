import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.reflector.get<string[]>('role', context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    console.log('guard a', admin);
    if (admin.includes(req.query.role as string)) {
      return true;
    }
    return false;
  }
}
