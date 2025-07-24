// These constants are injected via webpack DefinePlugin variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

declare const __DEBUG_INFO_ENABLED__: boolean;
declare const __VERSION__: string;

export const VERSION = __VERSION__;
export const DEBUG_INFO_ENABLED = __DEBUG_INFO_ENABLED__;
export const ekp_Version = 'eKulturPortal Version 2019.7.29';
export const ekp_kb = 'https://wissensdatenbank.ekulturportal-test.de/wp-login.php';
export const ekp_kb_homepage = 'https://wissensdatenbank.ekulturportal-test.de';

export const setting_email = 'http://keycloak:9080/realms/Ekp/account/?kc_locale=de';
export const setting_passwort = 'http://keycloak:9080/realms/Ekp/account/password';
export const SERVER_UNDER_CONSTRUCTION = false;
export const DOC_EDITOR_PORT = 'localhost:6002';
export const PDF_PORT = 'localhost:3000';
export const DOC_EDIT_WEB_API_ACTION = 'http://' + DOC_EDITOR_PORT + '/api/documenteditor/';
export const DOC_MERGE_WEB_API_ACTION = 'http://' + DOC_EDITOR_PORT + '/api/home/Merge/';
export const DOC_PREVIEW_WEB_API_ACTION = 'http://' + DOC_EDITOR_PORT + '/api/pdfviewer';
export const PDF_API_ACTION = 'http://' + PDF_PORT + '/forms/libreoffice/convert';
export const LOGOUT_AFTER_IDEL = 3600;
export const OPTTAB_WEBSOCKET = 'http://localhost:2323/websocket';
export const BPTAB_WEBSOCKET = 'http://localhost:2325/websocket';
export const BETTAB_WEBSOCKET = 'http://localhost:2324/websocket';
export const PRODTAB_WEBSOCKET = 'http://localhost:2322/websocket';
