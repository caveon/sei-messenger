# Sei Messenger

sei-messenger is a javascript package mean to ease integration with Caveon's Secure Exam Interface and external items.

```
npm install sei-messenger
```
You can read more about integration in our [technical post](http://help.caveon.com/kb-article/connecting-external-items-to-sei/) on help.caveon.com. Below are the basic instructions for use.

### Include/Import the file

You can include the package either by importing it or including it manually. The file does not use any export libraries and can be included plainly.

Download and include:

```
<script type="text/javascript" src="/path/to/file.js"></script>
```

Import

```
import 'sei-messenger'
```

To use the library, simply instantiate a new instance:

```
var messenger = new SeiMessenger();
```

Then to communicate with SEI, simply call the `sendMessage()` method with the string response.

```
messenger.sendMessage('Your message to SEI here.');
```

For an explanation of how the script works, and what additional utilities it supplies, visit the [technical post](http://help.caveon.com/kb-article/connecting-external-items-to-sei/) on help.caveon.com
