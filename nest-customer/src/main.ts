import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors(); //autorise les requêtes depuis un navigateur qui est connecté à un autre nome de domaine
  // création de la doc de l'API REST
  const options = new DocumentBuilder()
    .setTitle('Nest Customers')
    .setDescription('The Nest Customers API description')
    .setVersion('1.0')
    .addTag('customers')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
