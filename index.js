'use strict';

var React = require('react-native');
var deviceScreen = require('Dimensions').get('window');
var Tween = require('react-native-tween-animation');

var {
    StyleSheet,
    View,
    Component,
    TouchableWithoutFeedback,
    } = React;
import utils from './utils';

class Modal extends Component {

  constructor (props) {
    super(props);

    this.state = {
      modalUnderlay: {
        top: deviceScreen.height,
        opacity: 0
      },
      modal: {
        top: deviceScreen.height
      },
      modalWrapper: {
        height: 0
      }
    };
  }

  _showModalWrapper () {
    this.setState({
      modalWrapper: {
        height: deviceScreen.height
      },
      modalUnderlay: {
        top: 0
      }
    });
  }

  _hideModalWrapper () {
    this.setState({
      modalWrapper: {
        height: 0
      },
      modalUnderlay: {
        top: deviceScreen.height
      }
    });
  }

  _showModal () {
    this.modalTween = new Tween({
      start: {
        top: deviceScreen.height,
      },
      end: {
        top: 20,
      },
      duration: (this.props.hasOwnProperty('duration')) ? (
          this.props.duration
      ) : 500,
      tween: (this.props.hasOwnProperty('tween')) ? (
          this.props.tween
      ) : 'easeOutBack',
      frame: (tweenFrame) => this.setState({
        modal: tweenFrame
      })
    });
  }

  show () {
    if(this.props.hideStatusBar !== false)
      utils.setHidden(true);
    this._showModalWrapper();
    this.underlayTween = new Tween({
      start: {
        opacity: 0,
      },
      end: {
        opacity: 0.6,
      },
      duration: 200,
      tween: 'easeInQuad',
      frame: (tweenFrame) => this.setState({
        modalUnderlay: tweenFrame
      }),
      done: () => {
        this._showModal();
      }
    });
  }

  close () {
    if(this.props.hideStatusBar !== false)
      utils.setHidden(false);
    this.modalTween.reverse(() => {});
    this.underlayTween.reverse(() => {
      this._hideModalWrapper();
    });
  }

  renderChildren () {
    return React.cloneElement(
        this.props.children,
        {closeModal: this.close.bind(this)}
    );
  }

  render () {
    return (
        <View style={[styles.modalWrapper, this.state.modalWrapper]}>
          <View style={[styles.modalUnderlay, this.state.modalUnderlay]}></View>
          <View style={[styles.modal, this.state.modal, this.props.modalStyle]}>
            {this.renderChildren()}
          </View>
        </View>
    );
  }
};

var styles = StyleSheet.create({
  modalWrapper: {
    position: 'absolute',
    width: deviceScreen.width,
    height: deviceScreen.height,
    left: 0,
    top: 0,
    backgroundColor: 'transparent'
  },

  modalUnderlay: {
    position: 'absolute',
    width: deviceScreen.width,
    height: deviceScreen.height,
    left: 0,
    backgroundColor: '#000'
  },

  modal: {
    position: 'absolute',
    width: deviceScreen.width-40,
    height: deviceScreen.height-40,
    left: 20,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 4,
    overflow: 'hidden'
  }
});

module.exports = Modal;
