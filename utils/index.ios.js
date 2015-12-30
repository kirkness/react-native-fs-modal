var React = require('react-native');
var {
  StatusBarIOS
} = React;
export default {
  setHidden(hidden){
    StatusBarIOS.setHidden(hidden, 'slide');
  }
}
