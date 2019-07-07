---
layout: post
title: networking - notes 4 - OAuth
artist: Blue Foundation
artistLink: https://www.discogs.com/artist/5456-Blue-Foundation
track: Eyes On Fire (Zeds Dead Remix)
trackLink: https://youtu.be/IUGzY-ihqWc
tags: [networking, authorization, authentication, SQL, OAuth, HTTP, security ]
---

## contents

- [auth overview](#auth-overview)
    - [third-party auth](#third-party-auth)
- [OAuth](#oauth)
    - [auth flow](#auth-flow)
    - [google hybrid auth flow](#google-hybrid-auth-flow)
- [references](#references)
<hr>

## auth overview

- authentication: 
    - check for identity

- authorization (permissions):
    - check for permissions available for that identity
        - access to resources 
        - authority to perform certain actions

- cookie is a piece of code that browser can use as a pass to access private data 
    - a browser with a cookie has access to private user information 
        - client browser can reuse cookie without having to login for each request

    - *session hijacking*:
        - a stolen cookie is used to access private user information as it bypasses the need for authentication

<hr>  

#### third-party auth
<br>

- pros:
    - encryption and password storage handling is offset to the auth providers
    - easier for users to register through third party
    - user's don't have to remember passwords
        - no user passwords to be secured 
        - no leaked passwords if your site is hacked
- neutral:
    - users need to have the third-party accounts
    - so use OAuth providers that support popular third-party accounts that cover a large portion of your client base
- cons:
    - users do not want to let you access their third party account to enable auth 
        - your site isn't trusted enough for them to do that
        - keep auth scopes for your website minimal
        - request third-party account access only for the things that your app requires at the bare-minimum 
            - rule-of-least-privilege
    - if your web app is to operate in limited/restricted internet access
        - then third-party auth makes no sense 
        - it is better to use local password storage authentication
    - OAuth providers have varied requirements and it might not be enough for your web-app 
        - custom password strings 
        - custom 2-factor auth 

- if you're building your own auth system, make sure the client and the server systems cannot be compromised
    - a lot of security concerns and challenges must be address to achieve this

<hr>

## OAuth 

- widely used standard for authorization
    - specifically designed for use with HTTP
    - most providers use OAuth 2.0 for authentication 

- *OpenID connect* is another popular standard 
    - built on top of OAuth 2.0

<hr>

#### auth flow
<br>
- flow of security between client, server and OAuth provider
- OAuth 2.0 specification provides flexibility for the developer to implement security flow most appropriate for the application at hand

- client initiated flow:    
    - the flow is triggered by JS from the user's browser or mobile app
        - useful for SWA: single-page browser based web apps
        - mobile apps can authenticate and gain access to private user info
    - quick and easy, but lot of trust is placed on the client 
    - server cannot make OAuth API calls on behalf of the user

- server initiated flow:
    - having receiving an access token from the client:
        - flow is initiated by server 
        - servers uses client's token to access third-party auth API on behalf of the user
        - third-party returns access token to allow the client to work with private user data
    - server has more power over the security process
        - responsible for session security and access token security 

- both of these have pros and cons, must be used depending on the app's needs
    - Google offers a hybridized auth process which allows client to authenticate 
        - also allows server to make API calls from the client 

<hr>

#### google hybrid auth flow
<br>

- flow description:
    - user opts to login with google account
        - redirected to a google portal
    - user authorizes the app from the client-side using the JS API
    - google sends a one-time code and an access token back to the client
    - the client then sends (only) the same one-time code back to the server
        - this is relayed by the server back to the API
    - server is given access-token by google
        - enables server to make it's own API calls
        - even when user is offline

- security advantage over pure server side flow
    - a client secret is held at both google and on the server
        - one-time code is provided to the server by google
    - even if one-time code is compromised, the client secret is unique to the client only 
        - the client secret is a special code that is used by google to verify app

- [google OAuth2 docs](https://developers.google.com/adwords/api/docs/guides/authentication){: target="_blank"}
    - link address changes every quarter, google it if link doesn't work

#### setup google API

- create a new project 
    - use the [google API console for credentials](https://console.developers.google.com/apis/credentials){: target="_blank"}
- create an OAuth consent page 
    - with project name and support contact email
- create new credentials
    - to generate client ID and client secret 
- add localhost and port to 'Authorized JS Origins' 
    - to enable testing from local server
- anti-forgery protection: 
    - verifies that user sent the API request and not a malicious script
    - create unique session token 


<hr>

## references

- [google oauth 2.0 playground](https://developers.google.com/oauthplayground/){: target="_blank"}