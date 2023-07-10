import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Like This Movie')
    .setDescription('The Like This Movie API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port);
  console.log(`
  _      _ _          _______ _     _       __  __            _      
 | |    (_) |        |__   __| |   (_)     |  \\\/  |          (_)     
 | |     _| | _____     | |  | |__  _ ___  | \\  / | _____   ___  ___ 
 | |    | | |/ / _ \\    | |  | '_ \\| / __| | |\\/| |/ _ \\ \\ / / |/ _ \\
 | |____| |   <  __/    | |  | | | | \\__ \\ | |  | | (_) \\ V /| |  __/
 |______|_|_|\\_\\___|    |_|  |_| |_|_|___/ |_|  |_|\\___/ \\_/ |_|\\___| 

 By: Henrique Artur <contato@henriqueartur.com>
 Description: A test for Profectum + Unimed
  `);
  console.log(` Server running on port: ${port}`);
}
bootstrap();
