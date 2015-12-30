var {
  StatusBarIOS
} = React;
export default {
  setHidden(hidden){
    StatusBarIOS.setHidden(hidden, StatusBarIOS.Animation['slide']);
  }
}
