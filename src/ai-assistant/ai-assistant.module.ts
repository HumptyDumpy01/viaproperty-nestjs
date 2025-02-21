import { Module } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { AiAssistantResolver } from './ai-assistant.resolver';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAssistant } from './ai-assistant.entity';

@Module({
  providers: [AiAssistantResolver, AiAssistantService],
  imports: [AuthModule, TypeOrmModule.forFeature([AiAssistant])],
})
export class AiAssistantModule {}
