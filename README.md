# Sei Messenger

sei-messenger is a javascript package mean to ease integration with Caveon's Secure Exam Interface and external items.

```
npm install sei-messenger
```
You can read more about integration in our [technical post](http://help.caveon.com/kb-article/connecting-external-items-to-sei/) on help.caveon.com. Below are the basic instructions for use.

### Include/Import the file

You can import the package, or use the minified version included in the repository.

Download and include:

```
<script type="text/javascript" src="/path/to/SeiMessenger.min.js"></script>
```

Import

```

// ES6
import SeiMessenger from 'sei-messenger';

// requireJS
var SeiMessenger = require("sei-messenger");

```

To use the library, simply instantiate a new instance:

```
var messenger = new SeiMessenger();
```

Then to communicate with SEI, call the `sendMessage()` method with the message as a string.

```
messenger.sendMessage('Your message to SEI here.');
```

For an explanation of how the script works, and what additional utilities it supplies, visit the [technical post](http://help.caveon.com/kb-article/connecting-external-items-to-sei/) on help.caveon.com
