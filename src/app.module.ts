import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './files/files.service';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
