# PackApp

PackApp is a cloud based build service that lets you package your web app or website into a WebView based Android APK.
This repo contains the PackApp build server.

## Related Projects

- PackApp web client: https://github.com/dambusm/packapp-client
- PackApp web server: https://github.com/dambusm/packapp-server
- PackApp android WebView application: https://github.com/dambusm/packapp-android

## Requirements

- Linux
- Android studio
- Android SDK
- Node.js
- Python
- [android-asset-resizer](https://pypi.org/project/android-asset-resizer/) installed to $HOME/android-asset-resizer

## Setup

- Clone repo
- `npm install`
- Copy .env.example to .env and fill in required variables

## Development server

Run `npm run dev` for a dev server.
