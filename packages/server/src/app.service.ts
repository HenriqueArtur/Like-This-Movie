import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<p></p>
  _      _ _          _______ _     _       __  __            _      \n
 | |    (_) |        |__   __| |   (_)     |  \/  |          (_)     \n
 | |     _| | _____     | |  | |__  _ ___  | \  / | _____   ___  ___ \n
 | |    | | |/ / _ \    | |  | '_ \| / __| | |\/| |/ _ \ \ / / |/ _ \\n
 | |____| |   <  __/    | |  | | | | \__ \ | |  | | (_) \ V /| |  __/\n
 |______|_|_|\_\___|    |_|  |_| |_|_|___/ |_|  |_|\___/ \_/ |_|\___|\n
\n
 By: Henrique Artur <contato@henriqueartur.com>\n
 Description: A test for Profectum + Unimed\n
 `;
  }
}
