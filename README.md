# react-native-fs-modal

React native full screen modal component.

### Demo

![React Native Modal Component GIF](https://carquids.box.com/shared/static/lwu7uso8rx5wqwb9dlvdg6vdqit7szty.gif "React Native Modal Component GIF")

### Usage

**_NOTE:_** If you are using the native status bar you will need to combine this plugin with the [react-native-overlay plugin](https://github.com/brentvatne/react-native-overlay)

##### Using ref

```js

/**
 * Two methods show/hide
 */

showModal () {
  this.refs.modal.show();
}

hideModal () {
  this.refs.modal.close();
}

...

<Modal
  // Use ref to allow open/close
  ref={'modal'}

  // Duration of animation (defaults 500)
  duration={1000}

  // Any tween function (defaults 'easeOutBack')
  tween={'easeOutElastic'}

  // Pass styles to modal
  modalStyle={{borderRadius: 0}}

  // Hide/show UIStatusBar (defaults to true)
  hideStatusBar={true}
  // close modal when touch underlay
  closeOnTouch={true}
  >

  // Your modal's content
  <View style={theme.padder}>
    <Button
      onPress={this.hideModal.bind(this)}
      text={'Close modal'}/>
  </View>
</Modal>

```


##### Using a child component

```js

<Modal>

  /**
   * The hide func will be added to SomeComponent's props.
   * This will allow you to add close buttons from within
   * the modal's view.
   */

  <SomeComponent />
</Modal>

```
