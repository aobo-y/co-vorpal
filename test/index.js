var coVorpal = require('../index')
var Vorpal = require('vorpal')
var assert = require('assert')

describe('coVorpal', function () {
  it('support pass generator as vorpal command action', function () {
    var vorpal = new Vorpal()
    coVorpal(vorpal)

    function* handler(args) {
      yield Promise.resolve()
      return args.bar
    }

    vorpal
      .command('foo <bar>')
      .action(handler)

    var err
    return vorpal.exec('foo abc').catch(function (e) {
      err = e;
    }).then(function (res) {
      assert.equal(err, undefined)
      assert.equal(res, 'abc')
    })
  })

  it('support pass function as vorpal command action', function () {
    var vorpal = new Vorpal()
    coVorpal(vorpal)

    function handler(args) {
      return Promise.resolve(args.bar)
    }

    vorpal
      .command('foo <bar>')
      .action(handler)

    var err
    return vorpal.exec('foo abc').catch(function (e) {
      err = e;
    }).then(function (res) {
      assert.equal(err, undefined)
      assert.equal(res, 'abc')
    })
  })
})
