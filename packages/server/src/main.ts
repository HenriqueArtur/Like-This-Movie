import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
