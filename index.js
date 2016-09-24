var co = require('co')

function coVorpal(vorpal) {
  if (vorpal.__command) return

  vorpal.__command = vorpal.command

  vorpal.command = function () {
    var cmd = vorpal.__command.apply(vorpal, arguments)
    cmd.__action = cmd.action

    cmd.action = function () {
      var args = Array.prototype.slice.apply(arguments)
      var fn = args[0]

      // only wrap generator
      if (fn && fn.constructor && fn.constructor.name === 'GeneratorFunction') {
        args[0] = co.wrap(fn)
      }

      return cmd.__action.apply(cmd, args)
    }

    return cmd
  }

  return vorpal
}

module.exports = coVorpal
