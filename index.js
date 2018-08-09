'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./App.css');

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.renderBlocks = function () {
      var blocks = [];
      var count = getRandomInt(10, 40);
      for (var index = 0; index < count; index++) {
        var sides = ['left', 'right', 'top', 'bottom'];
        var color = getRandomColor();
        var left = getRandomInt(100, 1500);
        var top = getRandomInt(100, 700);
        blocks.push(_react2.default.createElement(
          'div',
          {
            key: 'block' + index,
            className: 'Block Block' + index,
            style: {
              marginLeft: left,
              marginTop: top,
              backgroundColor: '' + color
            }
          },
          '' + index
        ));

        var j = getRandomInt(0, count - 1);
        if (j !== index) {
          var fromSide = sides[getRandomInt(0, 3)];
          var toSide = sides[getRandomInt(0, 3)];
          blocks.push(_react2.default.createElement(_Arrow2.default, {
            key: 'Arrow_' + _this.state.i + '_' + index + '_' + j,
            fromSelector: '.Block' + index,
            fromSide: fromSide,
            toSelector: '.Block' + j,
            toSide: toSide,
            color: color,
            stroke: 3
          }));
        }
      }
      return blocks;
    };

    _this.state = { i: 0 };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var i = 0;
      setInterval(function () {
        i++;
        _this2.setState({ i: i });
      }, 2600);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'App' },
        this.renderBlocks()
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;