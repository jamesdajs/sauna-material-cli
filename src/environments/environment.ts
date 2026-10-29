// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Usa el mismo host desde el que se abrió la aplicación. Así, cuando se
// accede desde un celular por la IP local del equipo, no se intenta conectar
// a localhost (que apuntaría al propio celular).
const apiHost = typeof window !== 'undefined' && window.location.hostname
  ? window.location.hostname
  : 'localhost';
const apiProtocol = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? 'https'
  : 'http';
const apiBaseUrl = `${apiProtocol}://${apiHost}:3000`;

export const environment = {
  production: false,
  url: `${apiBaseUrl}/api`,
  urlimg: `${apiBaseUrl}/uploads/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
