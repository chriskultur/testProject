import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {AuthServerProvider} from 'app/core/auth/auth-session.service';
import {HttpParams} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private location: Location, private authServerProvider: AuthServerProvider) {}

  login(): void {
    // If you have configured multiple OIDC providers, then, you can update this URL to /login.
    // It will show a Spring Security generated login page with links to configured OIDC providers.
    location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/oidc')}`;
  }

  registration() {
    let paramsURL = new HttpParams().append('serve', 'serveRegPage');
    let stringUrl = paramsURL.toString();
    let encodedParams = encodeURIComponent(stringUrl);

    location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/oidc?' + encodedParams)}`;
  }

  logout() {
    this.authServerProvider.logout().subscribe((response:any) => {
      console.log(response);
      const data = response;
      let logoutUrl = data.logoutUrl;
      const redirectUri = `${location.origin}${this.location.prepareExternalUrl('/')}`;

      // if Keycloak, uri has protocol/openid-connect/token
      if (logoutUrl.includes('/protocol')) {
        logoutUrl = logoutUrl + '?redirect_uri=' + redirectUri;
      } else {
        // Okta
        logoutUrl = logoutUrl + '?id_token_hint=' + data.idToken + '&post_logout_redirect_uri=' + redirectUri;
      }
      window.location.href = logoutUrl;
    });
  }
}
