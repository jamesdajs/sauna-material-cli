import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localeBo from '@angular/common/locales/es-BO';

registerLocaleData(localeBo, 'es-BO');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
