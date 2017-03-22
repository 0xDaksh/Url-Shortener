# URL-Shortener
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/Dakshster/Url-Shortener/blob/master/LICENSE)
[![steam](https://img.shields.io/badge/steam-donate-green.svg?style=flat-square)](http://gg.gg/dmtrade)

Make a URL-Shortener easily with Node.js and Mongoose ODM!

Licensed Under MIT | (c) to Daksh Miglani (https://dak.sh | @Dakshster)

Deployed on Heroku, http://u.dak.sh

# What does it Use?
1. Node.js
2. Express.js
3. Mongoose.js
4. MongoDB
5. BodyParser Middleware

# How to Use it?

You just have to update 2 variables at Line 7 and 8 of `server.js` file:

1. Update the `siteURL` variable (for example: `https://dak.sh`) **without**
any `/` (backslash) at end. If you are using localhost, just leave it blank, or
you have to make sure that the domain name is pointing to the server if using
TLD.

2. Update the `databaseURL` variable with your MongoDB server url.

... and you are done!

# Bugs
If you find any bugs, You can submit a pull request!
