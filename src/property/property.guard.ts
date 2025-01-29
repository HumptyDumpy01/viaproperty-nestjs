import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PropertyService } from './property.service';

@Injectable()
export class PropertyGuard implements CanActivate {
  constructor(private propertyService: PropertyService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // get access to the current property id
    const propertyId = request.body.variables.id;

    try {
      const property = await this.propertyService.getProperty(propertyId);
      return !!property;
    } catch (err) {
      throw new BadRequestException('Property is not found');
    }
  }
}
