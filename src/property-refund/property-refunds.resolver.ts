import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PropertyRefundType } from './property-refunds.type';
import { PropertyRefundInput } from './property-refunds.input';
import { PropertyRefundService } from './property-refunds.service';

// Specify the type of the resolver to which it would be attached.
@Resolver((of) => PropertyRefundType)
export class PropertyRefundResolver {
  constructor(private propertyRefundService: PropertyRefundService) {}

  // example of usage (mutation)
  @Mutation((returns) => PropertyRefundType)
  createPropertyRefund(
    @Args('PropertyRefundInput') propertyRefundInput: PropertyRefundInput,
  ) {
    return this.propertyRefundService.createPropertyRefund(propertyRefundInput);
  }
}
