# Neighbourhood Map React Project
This is a Udacity project that shows a map of Egypt with famous locations to visit there. It has the functionality of filtering locations on both map and list. It uses Google Maps and fetches data from [Wikimedia API](https://www.mediawiki.org/wiki/API:Main_page).

This is a link to the same project but with [Mapbox GL JS API](https://www.mapbox.com/mapbox-gl-js/api/#map#setzoomhttps://www.mapbox.com/mapbox-gl-js/api/#map#setzoom) => [Click Here](https://github.com/Nouran96/Neighbourhood-Map-Project)

## _Installing_
Do the following steps:
1. Download the zipped folder
2. Unzip it
3. In a terminal, install the required dependencies by running `npm install` then run `npm start` to start the server (You should have node.js and npm installed)
4. The server will open in the browser and that's it (On port 3001)

#### _Note:_ 
The service worker and caching (Offline mode) will only work in the production mode (See next section on how to get there)

## _Run app in Production Mode_
1. Run in a terminal this command `npm run build`
2. Then install serve dependency by running `npm install -g serve`
3. Finally run `serve -s build`
4. Now open a tab in your browser to this url `http://localhost:5000`

## _Built With_
- HTML => Structure of the main and search pages
- CSS => Designing the colors and layout of the site in different viewports
- React.js => Functionality and interactivity of the site
- Google Maps => Adding the map, markers and corresponding popups
- Wikimedia API => Fetching the description of each location

## _License_
MIT License

Copyright (c) 2018 Nouran Samy Attia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.