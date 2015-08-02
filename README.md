## Welcome to React

This repository is a sample application of react and flux.

## React Sample

This repository includes three sample html sources.
* index.html
* form.html
* flux.html

`index.html` and `form.html` are made with only react, not with flux.
We can see them by only accessing via web browser.

`index.html` is a application which shows only "Hello, React".
`form.html` is a application which shows a text message you input.

## How to Run

`flux.html` needs some node modules.
`src/app.jsx` is a jsx file, so we have to convert it to a js file.

```
$ sudo npm install -g browserify watchify
$ npm install reactify react fluxxor
$ watchify -t reactify src/app.jsx -o dest/app.js -v
```

Now we can access `flux.html` and develop it.
