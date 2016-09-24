# co-vorpal
co-vorpal is [vorpal](https://github.com/dthree/vorpal) wrapper that enable using generator as command

## Installation

```
$ npm install co-vorpal
```

## Usage
Wrap the vorpal client
```javascript
var vorpal = require('vorpal')()
var coVorpal = require('co-vorpal')

coVorpal(vorpal)
```
Use co style generator as command action
```javascript
vorpal
  .command('foo <bar>')
  .action(function* (args) {
    var res = yield asyncApi(args.bar)
    this.log(res)
  })
```
Still able to use normal function, won't affect existing code
```javascript
vorpal
  .command('foo <bar>')
  .action(function (args, cb) {
    asyncApi(args.bar, (err, res) => {
      this.log(res)
      cb()
    })
  })
```

## License
MIT
