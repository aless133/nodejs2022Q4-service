import { Module, NestModule, MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavsModule } from './favs/favs.module';
import { LoggerModule } from './logger/logger.module';
// import { RSLoggerService } from './logger/logger.service';
import { RequestLoggerMiddleware } from './logger/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './logger/exception.filter';

@Module({
  imports: [UsersModule, TracksModule, ArtistsModule, AlbumsModule, FavsModule, LoggerModule],
  // exports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService
    , 
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  // constructor(private readonly logger: RSLoggerService) {
  //   console.log(1);
  //   process.on('unhandledRejection', (error) => {
  //     console.log(2);
  //     this.logger.error('handle the reject... '+error.toString());
  //     process.exit(1);
  //   });
  // }

  // onModuleInit() {
  //   console.log(44444);
    // process.on('unhandledRejection', (reason, promise) => {
    //   console.log(2222);
    //   this.logger.error('handle the reject... '+reason.toString());
    //   // const logger = this.injector.get<LoggerService>(RSLoggerService);
    //   // logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    // });
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
