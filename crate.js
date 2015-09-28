var crate = (function() {
  var api = {};
  api.init = function(ob) {
    if (api.isSet(ob.setBody)) {//setBody is REQUIRED!
      api.destroyCrates(); //One modal at a time ladies
      function setActions(src, target) {
        if(typeof src == 'object') {
          api[target + 'Delay'] = (typeof src.delay == 'number') ? src.delay : false;
          api[target + 'Action'] = (typeof src['action'] == 'function') ? src['action'] : false;
        } else {
          api[target + 'Delay'] = (typeof src == 'number') ? src : false;
          api[target + 'Action'] = (typeof src == 'function') ? src : false;
        }
      };
      setActions(ob.onOpen, 'crateOpening');
      setActions(ob.onClosing, 'crateClosing');
      api.createCrate(ob);
    } else {
      console.error("crate.js: setBody is required in the object passed to the init function.");
      return false;
    }
  };

  api.isSet = function(item) {
    //Check to see if the properties are set in the object
    if (typeof item === "undefined" || item === "" || item === null) {
      return false;
    } else {
      return true;
    }
  };

  api.createCrate = function(ob) {
    //Private functions of the init function
    function createElement(type, className, location) {
      //Creating the new elements
      var el = document.createElement(type);
      el.className = className;
      location.appendChild(el);
      return el;
    };
    function addListener(el,action,result) {
      //Add listeners
      if (action === 'click') {
        if (el.addEventListener) {
          el.addEventListener(action, result);
        } else if (el.attachEvent) { //IE8
          el.attachEvent('on' + action, result);
        };
      } else if (action === 'keyup') {
        if (el.addEventListener) {
          el.addEventListener(action, result, false); //27 is the escape button
        } else if (el.attachEvent) { //IE8
          el.attachEvent(action, result, false);
        };
      };
    };
    //Read the object and assign variables
    api.crateParent = (api.isSet(ob.setParent)) ? document.querySelector(ob.setParent) : document.body;
    api.isPositioned = api.isSet(ob.setPosition);
    api.crateTop = (api.isPositioned) ? ob.setPosition[0] : null;
    api.crateLeft = (api.isPositioned) ? ob.setPosition[1] : null;
    api.crateTitle = (api.isSet(ob.setTitle)) ? ob.setTitle : null;
    api.crateBody = ob.setBody;
    api.crateFooter = (api.isSet(ob.setFooter)) ? ob.setFooter : null;
    if (api.isSet(ob.closeActions)) {
      if (api.isSet(ob.closeActions) && !api.isSet(ob.closeActions.button)) {
        api.crateButton = false;
      } else {
        api.crateButton = (api.isSet(ob.closeActions.button)) ? ob.closeActions.button : true;
      }
      api.crateClickIn = (api.isSet(ob.closeActions.clickIn)) ? ob.closeActions.clickIn : false;
      api.crateClickOut = (api.isSet(ob.closeActions.clickOut)) ? ob.closeActions.clickOut : false;
      api.cratePressKeys = (api.isSet(ob.closeActions.pressKeys)) ? ob.closeActions.pressKeys : false;
    } else {
      api.crateButton = true;
    }
    api.crateOverlay = (api.isSet(ob.setOverlay)) ? ob.setOverlay : 'rgba(0,0,0,.8)';
    api.crateClasses = (api.isSet(ob.attachClass)) ? ob.attachClass : false;

    //Create the container
    api.crateContainer = createElement('div','crate-contain',api.crateParent);
    api.styleElement(api.crateContainer, {'display':'none','top':'0','left':'0','right':'0','bottom':'0','z-index':'500','background':api.crateOverlay});

    //Create the content
    api.crateContent = createElement('div','crate-content',api.crateParent);
    if (api.isPositioned) {
      if (api.isSet(ob.setPosition[0]) && api.isSet(ob.setPosition[1])) {//top and left both defined
        api.styleElement(api.crateContent,{'display':'none','z-index':'501','top':api.crateTop,'left':api.crateLeft});
      } else if (api.isSet(ob.setPosition[0]) && !api.isSet(ob.setPosition[1])) {//top defined, no left
        api.styleElement(api.crateContent,{'display':'none','z-index':'501','top':api.crateTop,'left':'50%','transform':'translate(-50%, 0)','webkitTransform':'translate(-50%,0)'});
      } else if (!api.isSet(ob.setPosition[0]) && api.isSet(ob.setPosition[1])) {//no top, left defined
        api.styleElement(api.crateContent,{'display':'none','z-index':'501','top':'50%','left':api.crateLeft,'transform':'translate(0, -50%)','webkitTransform':'translate(-50%,0)'});
      }
    } else {//no top, no left
      api.styleElement(api.crateContent,{'display':'none','z-index':'501','top':'50%','left':'50%','transform':'translate(-50%, -50%)','webkitTransform':'translate(-50%,-50%)'});
    }

    //Center of the body or center of an element?
    if (api.isSet(ob.setParent)) {
      api.styleElement(api.crateContainer,{'position':'absolute'});
      api.styleElement(api.crateContent,{'position':'absolute'});
    } else {
      api.styleElement(api.crateContainer,{'position':'fixed'});
      api.styleElement(api.crateContent,{'position':'fixed'});
    }

    //Create the header
    if (api.isSet(ob.setTitle)) {
      api.crateTitle = createElement('div','crate-title',api.crateContent);
      api.crateTitle.innerHTML = ob.setTitle;
    } else if (!api.isSet(ob.setTitle) && api.crateButton) {
      api.crateTitle = createElement('div','crate-title',api.crateContent);
    }

    //Create the body
    if (api.isSet(ob.setBody)) {
      api.crateBody = createElement('div','crate-body',api.crateContent);
      api.crateBody.innerHTML = ob.setBody;
    }

    //Create the footer
    if (api.isSet(ob.setFooter)) {
      api.crateFooter = createElement('div','crate-footer',api.crateContent);
      api.crateFooter.innerHTML = ob.setFooter;
    }

    //Create the close and bind actions
    if (api.isSet(ob.closeActions)) {
      if (api.crateButton) {
        api.crateClose = createElement('div','crate-close',api.crateTitle);
        addListener(api.crateClose, 'click', api.destroyCrates);
      }
      if (api.crateClickIn) {
        addListener(api.crateContent, 'click', api.destroyCrates);
      }
      if (api.crateClickOut) {
        addListener(api.crateContainer, 'click', api.destroyCrates);
      }
      if (api.cratePressKeys) {
        addListener(window, 'keyup', function(e) {
          for (var i = 0; i < api.cratePressKeys.length; i++) {
            if (e.keyCode == api.cratePressKeys[i]) {
              api.destroyCrates();
              break;
            }
          }
        });

      }
    } else { //default to a button
      api.crateClose = createElement('div','crate-close',api.crateTitle);
      addListener(api.crateClose, 'click', api.destroyCrates);
    }

    if (api.crateClasses) {
      api.addClasses(api.crateClasses);
    }
    api.openCrate();
  };

  api.styleElement = function(el, styles) {
    for (e in styles) {el.style[e] = String(styles[e]);}
  };

  api.addClasses = function(classes) {
    for (e in classes) {
      el = document.querySelector(e);
      el.className = el.className + " " + classes[e];
    }
  };

  api.destroyCrates = function() {
    if (typeof api.crateContainer !== 'undefined' && typeof api.crateContent !== 'undefined') {
      function closeAction() {
        api.crateContainer.parentNode.removeChild(api.crateContainer);
        api.crateContent.parentNode.removeChild(api.crateContent);
        //Reset the variables to be able to open the crate more than once
        delete api.crateContainer;
        delete api.crateContents;
        if (api.isSet(api.crateClosingAction) && typeof api.crateClosingAction == 'function') {
          api.crateClosingAction();
        }
      }
      if (api.isSet(api.crateClosingDelay)) {
        setTimeout(closeAction,api.crateClosingDelay);
      } else {
        closeAction();
      }
    }

  };

  api.openCrate = function() {
    function openAction() {
      if (api.isSet(api.crateOpeningAction) && typeof api.crateOpeningAction == 'function') {
        api.crateOpeningAction();
      }
      api.showCrate();
    }
    if (api.isSet(api.crateOpeningDelay)) {
      setTimeout(openAction,api.crateOpeningDelay);
    } else {
      openAction();
    }
  };

  api.showCrate = function() {
    api.styleElement(api.crateContainer,{'display':'block'});
    api.styleElement(api.crateContent,{'display':'block'});
  };

  api.hideCrate = function() {
    api.styleElement(api.crateContainer,{'display':'none'});
    api.styleElement(api.crateContent,{'display':'none'});
  };

  api.toggleCrate = function() {
    if (api.crateContainer.style.display === 'none') {
      api.showCrate();
    } else {
      api.hideCrate();
    }
  };
  return api;
})();
