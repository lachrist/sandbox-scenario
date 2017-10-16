const Stream = require("stream");
function noop () {}
function autopush (chunk, encoding, callback) {
  this.push(chunk, encoding);
  callback();
}
module.exports = () => new Stream.Duplex({
  read: noop,
  decodeStrings: false,
  write: autopush
});