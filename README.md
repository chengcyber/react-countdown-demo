# React Count Down Demo

  this demo is mimic a use case of phone number validation, user fills in the phone number, after checking the validation, a request will be send to back end, and a default 60 seconds prevent user to send request again before any response from back end.

# Description

  0. free unmount remount via clicking switch
  1. fill in your phone number
  2. click SEND button
  3. wait 5 secs, receive a `success` feedback :)
  4. re-click SEND button with the same phone number
  5. another 5 secs, receive a warning about duplicate phone number usage

# Run in local

```
git clone git@github.com:kimochg/react-countdown-demo.git
cd react-countdown-demo
yarn install
yarn start
```

normally, a browser window will open and visit `localhost:3000/`

# Test

```
yarn test
```

press a to run all test

# LINCENSE

MIT
