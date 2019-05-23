# BROWSER TECH ENDGAME

## Demo

[Demo can be found here](http://178.128.247.118)

## Soccer notifications

My assignment was to create notifications for soccer matches when a soccer team has scored.

## Core functionalities

	- Select your team
	- Get update when a team has scored


## Functional

The app should be functional without the use of javascript. I achieved this by using an update button. This way the user can still get updates if there is no javascript available, or fails to load.

## Usable

Trough longpolling the user can get live updates when someone scores.

## Pleasurable

The user can choose whether they want live updates or not. The reason for this is that when the user is on a cellular connection, they can decide for themselves whether they want live updates. This is because the don't want to use anymore of their data bundle.

## Feature detection

```javascript
if("XMLHttpRequest" in window)

````
![Caniuse](https://i.gyazo.com/be48bdba63c3f51a1769ab380cf73a57.png)

For some reason, there are browsers that do not support Ajax calls. And without ajax calls, longpolling is not an option. And certain buttons don't have to be rendered. 


## Tests

### Browsers

My app worked succesfully on all browsers with and without javascript. On certain browsers, like on the kindle and opera mini, longpolling didn't work. But because there was an update button, the user was still able to get updates. And the toggle button was succesfully not displayed in the browsers that didn't support Ajax.

### Screen readers

My app was beeing read by the screenreaders. However, live updates didn't work yet. For that I had to create an aria live region. Adding that made the screenreader read live updates.

## Accesibillity

### No mouse

The website is navigatable with the keyboard. I've implemented focus states for the clickable elements

### Symmantic HTML

I've used html as it should be, no clickable div's. No weird stuff.

### Screenreader

I created a live region with a paragraph element, where custom messages can be read for screenreaders when a team has scored.


## Contrast

### Normal

![Normal](https://i.gyazo.com/588ed1f3dc5789e01466ec97a34bca27.png)

### Red blind

![Red](https://i.gyazo.com/9db315a0fb2d17d50ad40582cd49ced4.png)

### Green blind

![Green](https://i.gyazo.com/1e8503bc8e3eabeea2922a3f5f9136b9.png)

### Blue blind

![Blue](https://i.gyazo.com/9dcaa4a8b92d5951d37ddb29f491b0cd.png)

### Monochromacy

![Mono](https://i.gyazo.com/948fdc223221c363e577229c004ad650.png)

## Wireflow
![Wireflow](./img-bin/wireflow.png)






