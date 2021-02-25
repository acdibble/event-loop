const { pbkdf2, pbkdf2Sync } = require('crypto');
const { promisify } = require('util');

const pbkdf2Async = promisify(pbkdf2);

/**
 * this takes around 4-6 seconds to execute on my MPB and it blocks anything
 * other things from happening in the event loop
 */
const blocking = () => {
  pbkdf2Sync('test', 'test', 10000, 10000, 'sha1');
  pbkdf2Sync('test', 'test', 10000, 10000, 'sha1');
  pbkdf2Sync('test', 'test', 10000, 10000, 'sha1');
  pbkdf2Sync('test', 'test', 10000, 10000, 'sha1');
};

/**
 * this takes around 4-6 seconds to execute on my MPB but it does not block the
 * event loop
 */
const asynchronous = async () => {
  await pbkdf2Async('test', 'test', 10000, 10000, 'sha1');
  await pbkdf2Async('test', 'test', 10000, 10000, 'sha1');
  await pbkdf2Async('test', 'test', 10000, 10000, 'sha1');
  await pbkdf2Async('test', 'test', 10000, 10000, 'sha1');
};

/**
 * this takes < 2 seconds to execute on my MPB
 */
const asynchronousParallel = async () => {
  await Promise.all([
    pbkdf2Async('test', 'test', 10000, 10000, 'sha1'),
    pbkdf2Async('test', 'test', 10000, 10000, 'sha1'),
    pbkdf2Async('test', 'test', 10000, 10000, 'sha1'),
    pbkdf2Async('test', 'test', 10000, 10000, 'sha1'),
  ])
};

module.exports = { blocking, asynchronous, asynchronousParallel }
