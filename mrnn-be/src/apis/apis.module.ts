import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [AuthModule, BookModule],
  exports: [AuthModule, BookModule],
})
export class ApisModule {}
