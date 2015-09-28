#CRATE.JS

A modal creation library with no external dependencies.

##Why use crate.js?

While there are several modal libraries currently available to use, each has their own advantages and disadvantages. Outlined here are a few reasons why it is beneficial to use crate.js:

###Simple Initialization

1. It's as simple as setting up your options object (there is an additional handy tool for this if needed)
2. Download and install the source
3. Call ```crate.init(options)```

###Lightweight

There is no need to worry about page load speed as it is micro sized (1.4KB gzipped or 4.89KB minified or 8.35KB with out compression).

###Flexibility

crate.js utilizes several options included in the popular modal creating libraries.

- crate.js can close the modal with a key press you define.
- It can set specific stylings.
- Another standard feature is being able to call a function after crate.js is opened or closed.
- Read the "Option Parameters" below for a full list of all available options.

###Control

You have the option to control crate using a multitude of options from crate.js. From setting the overlay color, to controlling when to close the crate in order to fire animations at the perfect time – crate.js offers amazing control and functionality.

#INITIALIZATION:
Create a javascript object with your requested setting parameters.

Call ```crate.init(options);```

##OPTION PARAMETERS:


###*setBody [REQUIRED]
- pass in full html markup as a string
- has a default class of crate-body
- Example: ```{'setBody':'Some String'}``` or ```{'setBody':'<div class="styled">Some HTML</div>'}```

###setTitle
- pass in full html markup as a string
- has a default class of crate-title
- Example: ```{'setBody':'Some String', 'setTitle':'Some Title'}```

###setFooter
- pass in full html markup as a string
- has a default class of crate-footer
- Example: ```{'setBody':'Some String', 'setFooter':'Some Footer'}```

###setParent
- pass a string of the element you want to house the crate container
- defaults to body
- Example: ```{'setBody':'Some String', 'setParent':'.more'}```

###setPosition
- pass an array of the top style and left style in px
- any CSS measurement can be passed in as a string
- defaults to center
- Example: ```{'setBody':'Some String', 'setPosition':'['calc(25% - 200px','14em']'}```

###closeActions
- pass in an object with parameters below
  - button
    - pass in true or false for a button to appear in the title
    - has a default class of crate-close
    - defaults to true
    - if no title is set and button is on, a blank title with a button will appear
    - Example: ```{'setBody':'Some String', 'closeActions':{'button':true}```

  - clickIn
    - pass in true or false for the crate to close when you click inside of the container
    - Example: ```{'setBody':'Some String', 'closeActions':{'clickIn':true}```

  - clickOut
    - pass in true or false for the crate to close when you click outside of the container
    - Example: ```{'setBody':'Some String', 'closeActions':{'clickOut':true}```

  - pressKeys
    - pass in an array of numbers assigned to keyCodes that will close the crate
    - use javascript keyCode numbers only
    - Example: ```{'setBody':'Some String', 'closeActions':{'pressKeys':[27]}``` (p.s. 27 is the esc key)

  - Any combination
    - Example: ```{'setBody':'Some String', 'closeActions':{'button':true,'clickOut':true,'pressKeys':[27]}```

  - Leave it blank for NO WAY to close the crate besides calling the public function to do so
  - Example: ```{'setBody':'Some String', 'closeActions':{}```

###setOverlay
- pass in a string of a hex color, rgb, or rgba for the container to be colored
- container has a default class of crate-contain
- defaults to rgba(0,0,0,.8)
- Example: ```{'setBody':'Some String', 'setOverlay':'#ff0000'}```

###attachClass
- pass in an object of selectors (eg classes (.class) or ids (#id)) and styles to be added to the selector
- great for adding animations to the container of the crate
- Single Use Example: ```{'setBody':'Some String', 'attachClass':{'.crate-container':'some-animation'}}```
- Multi Use Example: ```{'setBody':'Some String', 'attachClass':{'.crate-container':'some-animation','.crate-footer':'something-else'}}```

###onOpen
####option 1:
- pass in a number to be used as a delay in ms before the crate is opened
- perfect if you are running an animation on init and want to delay the opening of the crate
- example: ```{'setBody':'Some String', 'onOpen':250}```

####option 2:
- pass in a function to be used as the crate is opened
- perfect if you want to execute more javascript after the crate has been opened
- example: ```{'setBody':'Some String', 'onOpen':function open() {alert('open');}}```

####option 3:
- pass in an object made of a delay parameter with a number in ms and an action parameter with a function
- will execute the function after the delay on open.
- mixture of option 1 and 2
- example: ```{'setBody':'Some String', 'onOpen':{'delay':250,'action':function open() {alert('open');}}}```

###onClosing
- same options as onOpen, except executed when the crate is closed
- example: ```{'setBody':'Some String', 'onClosing':{'delay':250,'action':function close() {alert('close');}}}```

##EXAMPLE OBJECTS

###Completely filled out
```
{'setBody':'<div>Some HTML</div>','setParent':'.more','setPosition':[0,0],'setTitle':'<div>Some Title</div>','setFooter':'<div>Some HTML</div>','closeActions':{'button': true,'clickIn': false,'clickOut': false,'pressKeys': [27],},'setOverlay':'rgba(255,255,255,.5)','attachClass':{'.crate-body':'blue'},'onOpen':{'delay':1000,'action':function open() {alert('open');}},'onClosing':{'delay':1000,'action':function close() {alert('close');}}};
```

###Bare minimum
```
{'setBody':'Some string'};
```

#USEFUL PUBLIC FUNCTIONS:
You have availability to run these functions at any time after crate.init has been ran.

###crate.addClass(object)
- pass in the same object you would as in the init with the attachClass parameters

###crate.destroyCrate()
- it will delete the crate and also run the function as well as delay if you passed it in the onClosing init param

###crate.openCrate()
- it will show the crate and also run the function and delay if you passed it in the onOnen init param

###crate.showCrate()
- it will show the crate

###crate.hideCrate()
- it will hide the crate

###crate.toggleCrate()
- it will toggle the display of the crate

#NEW CSS CLASSES
```.crate-contain ```

```.crate-content ```

```.crate-title``` (child of ```.crate-content```) [if applicable]

```.crate-close``` (child of ```.crate-title```) [if applicable]

```.crate-body``` (child of ```.crate-content```)

```.crate-footer``` (child of ```.crate-content```) [if applicable]

#COMPATIBILITY

crate.js has been tested with:

#####Windows
- Chrome 38
- Firefox 32
- IE 10
- Safari 5

#####Mac
- Chrome 38
- Firefox 32
- Safari 8

#####Ubuntu
- Chrome 37
- Firefox 32

#####Android
- Chrome 38
- Firefox 32

#####iOS
- Safari

#VERSION HISTORY

v0.1 - 10/13/2014 - Initial release

#CRATE MAKER

For an additional and easier way to create your crate.js options, use the [crate maker tool](http://galavantier.github.io/crate.js/cratemaker.html)
