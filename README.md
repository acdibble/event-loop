# event-loop

A minimal example of how blocking calls in Electron degrade the user experience.

### Getting started

```shell
$ git clone https://github.com/acdibble/event-loop.git
$ cd event-loop
$ npm i
$ npm start
```

There are three buttons to push:

## Blocking call (bad)

This initiates a blocking cryptographic call. The user interface freezes
completely while this call executes, i.e. the event loops of both the renderer
and main process are blocked. Pushing any other button on the UI has no
immediate effect. Moreover, there is no ability to parallelize these calls and
they must be executed serially.

## Non-blocking call (good)

This initiates the same exact logic but asynchronously. Because the calls are
asynchronous, we are able to run multiple concurrently, which is demonstrable
by pushing the button in quick succession. This call lasts as long as its
blocking counterpart.

## Parallel call (best)

While JavaScript (and therefore Node.js) is single-threaded, utilizing
asynchronous calls allows for parallelization of calls that execute outside of
the JavaScript event loop. This call runs much faster than the naive
asynchronous function and is therefore preferred.
