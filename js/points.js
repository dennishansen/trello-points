var ICON = './images/logo.png';
var NO_POINTS = '?';
var pointArray = [1, 2, 3, 5, 8, 20, 40, 100, NO_POINTS];

var cardBadge = function(t) {
  return t.get('card', 'shared', 'complexity').then(function(points) {
    if (points && points != NO_POINTS) {
      return [{
        dynamic: function() {
          return {
            text: points,
            icon: ICON
          }
        }
      }]
    } else {
      return [];
    }
  });
};

var cardButton = function(t) {
  return t.get('card', 'shared', 'complexity').then(function(points) {
    if (points && points != NO_POINTS) {
      var text = points + " complexity";
    } else {
      var text = "Complexity";
    }

    return [
      {
        icon: ICON,
        text: text,
        callback: complexityButtonCallback
      }
    ];
  });
};

var complexityButtonCallback = function(t) {
  var points = pointArray.map(function(point) {
    return {
      text: point,
      callback: function(t) {
        return t.set('card', 'shared', 'complexity', point).then(function() {
          return t.closePopup();
        })
      }
    };
  });

  return t.popup({
    title: 'What is the complexity?',
    items: points
  });
};

TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return cardBadge(t);
  },
  'card-buttons': function(t, options) {
    return [cardButton(t),cardButton(t)];
  }
});
