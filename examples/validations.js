var Mongorito, Tweet, tweet;

Mongorito = require('../lib/mongorito');

Mongorito.connect('databaseName', ['127.0.0.1:27017']);

Tweet = (function() {

  function Tweet() {
    Tweet.__super__.constructor.call(this, 'tweets');
  }

  Tweet.prototype.validateBody = function(callback) {
    if (this.body.length >= 140) {
      return callback(false);
    } else {
      return callback(true);
    }
  };

  return Tweet;

})();

Tweet = Mongorito.bake(Tweet);

tweet = new Tweet;

tweet.body = 'I want to be super-super-super-super long! Reallly, reallly, long!!!! In fact, I am VEEERY long! You\'ve never seen such a looooooong tweeeeeet!';

tweet.save(function(err, results) {});
