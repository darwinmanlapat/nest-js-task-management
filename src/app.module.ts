import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), TasksModule],
})
export class AppModule {}
