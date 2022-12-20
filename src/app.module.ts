import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfessorModule } from './modules/professor/professor.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AtGuard } from './modules/common/guards/at.guard';
import { AllExpectionsFilter } from './http-error-handlers/http.expection.filter';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ProfessorModule,
    ConfigModule.forRoot({}),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,

    },{
      provide:APP_FILTER,
      useClass:AllExpectionsFilter
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
