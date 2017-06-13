# hypem-audio

> Scrapes [Hype Machine](http://hypem.com) url to get audio stream urls

## Install

```bash
npm install hypem-audio
```

## Usage

```node.js
const {getStreamUrls} = require('hypem-audio')

const url = 'http://hypem.com/latest'

getStreamUrls(url)
.then(streamUrls => {
  console.log(streamUrls)

  /*
  ['http://api.soundcloud.com/tracks/325088081/stream?consumer_key=nH8p0jYOkoVEZgJukRlG6w',
    ...
  ]
  */
})
.catch(error => {
  console.error(error)
})
```

## Test

```bash
npm test
```

NOTE: this module will most likely break in the future when Hype Machine updates their audio endpoints.

## License

MIT
