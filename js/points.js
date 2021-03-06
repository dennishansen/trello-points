var ICON = './images/logo.svg';
var NO_POINTS = '?';
var pointsArray = [1, 2, 3, 5, 8, 20, 40, 100, NO_POINTS];

var cardBadge = function(t) {
  return t.get('card', 'shared', 'complexity')
  .then(function(complexity) {
    return t.get('card', 'shared', 'impact')
    .then(function(impact) {
      if (complexity && complexity != NO_POINTS &&
          impact && impact != NO_POINTS) {
        return [{
          dynamic: function() {
            return {
              title: 'Importance',
              text: (impact / complexity).toFixed(1),
              icon: ICON
            }
          }
        }]
      } else {
        return [];
      }
    });
  });
  return t.get('card', 'shared', 'points').then(function(points) {

  });
};

var cardButton = function(t) {
  return t.get('card', 'shared', 'complexity')
  .then(function(complexity) {
    return t.get('card', 'shared', 'impact')
    .then(function(impact) {
      if (complexity && complexity != NO_POINTS) {
        var complextyText = complexity + " complexity";
      } else {
        var complextyText = "Complexity";
      }
      if (impact && impact != NO_POINTS) {
        var impactText = impact + " impact";
      } else {
        var impactText = "Impact";
      }

      return [
        {
          icon: ICON,
          text: complextyText,
          callback: complexityButtonCallback
        },
        {
          icon: ICON,
          text: impactText,
          callback: impactButtonCallback
        }
      ];
    });
  });
};

var complexityButtonCallback = function(t) {
  let points = pointsArray.map(function(point) {
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
  let points = pointsArray.map(function(point) {
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
