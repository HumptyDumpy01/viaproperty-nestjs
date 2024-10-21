import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PropertyRefundType } from './property-refunds.type';
import { PropertyRefundInput } from './inputs/property-refunds.input';
import { PropertyRefundService } from './property-refunds.service';
import { ChangePropertyRefundStatusInput } from './inputs/change-property-refund-status.input';

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

  @Mutation((returns) => PropertyRefundType)
  changePropertyRefundStatus(
    @Args('ChangePropertyRefundStatusInput')
    changePropertyRefundStatusInput: ChangePropertyRefundStatusInput,
  ) {
    return this.propertyRefundService.changePropertyRefundStatus(
      changePropertyRefundStatusInput,
    );
  }
}
