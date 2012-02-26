# Mongorito

*Awesome* MongoDB ODM for Node.js. Just take a look on its pretty models. Uses Mongolian for interacting with MongoDB.

# Features

- Define models, and operate with them just like usual objects, forget about documentation
- Built-in caching, using [Memcacher](https://github.com/vdemedes/memcacher)
- Based on Mongolian
- Super-fast, lightweight, all codebase is in one file
- Covered by tests
- Used in production projects
- Active development

# Installation

```
npm install mongorito
```

# Usage

```coffee-script
Mongorito = require 'mongorito'

Mongorito.connect 'database', ['127.0.0.1:27017'], 'user', 'password'
Mongorito.cache ['127.0.0.1:11211'] # optional, allows automatic, smart caching. It is just one line to enable it!

class Post
	constructor: ->
		super 'posts' # telling our collection name

Post = Mongorito.bake Post # Now, we are ready to go!

post = new Post
post.title = 'Very interesting article.'
post.content = 'Really, really, exciting.'
post.save (err) ->
	# saved!
	
	post.title = 'Edited title!'
	post.save (err) ->
		# updated!
		
		post.remove ->
			# removed!

Post.find { title : 'Some title!' }, (err, posts) ->
	for post in posts
		# post is an instance of Post model, so you can perform usual methods on it
		post.remove ->
```

# Interested?

Check out **examples** folder, it has a lot of code, which describes all parts of Mongorito.

# For pure JS folks

Nothing special, you will just have to use dirtier syntax, but that's ok.

```javascript
var Mongorito = require('mongorito');

Mongorito.connect('database', ['127.0.0.1:27017'], 'user', 'password');
Mongorito.cache(['127.0.0.1:11211']);

var Post = (function(){
	
	function Post(){ // constructor
		Post.__super__.constructor.call(this, 'posts');
	}
	
	Post.prototype.validateTitle = function(callback){ // declare methods, like this
		if(! this.title) {
			callback(false);
		} else {
			callback(true);
		}
	}
	
	return Post;
	
})();

Post = Mongorito.bake(Post); // Now, we are ready to go!

Post.find(function(err, posts){
	var length = posts.length;
	for(var i = 0; i < length; i++) {
		posts[i].remove(function(){ // posts[i] is an instance of Post class, so you can operate with it as a model
			// removed
		});
	}
});
```

# Tests

Tests made using Mocha. Run using:

```
cd tests && mocha *
```


# License 

(The MIT License)

Copyright (c) 2011 Vadim Demedes &lt;sbioko@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.