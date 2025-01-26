import { UserTypeEnum } from '../enums/user-type.enum';

export interface PropertyRepliesInterface {
  id: string;
  comment: string;
  commentId: string;
  replierInitials: string;
  userType: UserTypeEnum;
  createdAt: string;
}
