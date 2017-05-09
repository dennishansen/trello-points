var ICON = './images/logo.png';
var NO_POINTS = '?';
var pointsArray = [1, 2, 3, 5, 8, 20, 40, 100, NO_POINTS];

var cardBadge = function(t) {
  return t.get('card', 'shared', 'points').then(function(points) {
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
  return t.get('card', 'shared', 'points').then(function(points) {
    if (points && points != NO_POINTS) {
      var text = points + " points";
    } else {
      var text = "Points";
    }

    return [
      {
        icon: ICON,
        text: text,
        callback: complexityButtonCallback
      },
      {
        icon: ICON,
        text: text,
        callback: impactButtonCallback
      }
    ];
  });
};

var complexityButtonCallback = function(t) {
  pointsArray.map(function(point) {
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

var impactButtonCallback = function(t) {
  points.map(function(point) {
    return {
      text: point,
      callback: function(t) {
        return t.set('card', 'shared', 'impact', point).then(function() {
          return t.closePopup();
        })
      }
    };
  });

  return t.popup({
    title: 'What is the impact?',
    items: points
  });
};

TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return cardBadge(t);
  },
  'card-buttons': function(t, options) {
    return cardButton(t);
  }
});
