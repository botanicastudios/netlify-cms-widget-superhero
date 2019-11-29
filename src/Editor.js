import React from 'react'
import ReactDOM from 'react-dom'
import './superhero-editor.css'
import CaptureKeyPress from './CaptureKeyPress'
import { Map, fromJS } from 'immutable'
import uuid from 'uuid/v4';
import SvgBuilder from '../vendor/SvgBuilder.umd.min'
import '../vendor/SvgBuilder.css'

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.controlID = uuid()
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);

    var block 
    // value may be an immutable or a plain object 
    if(this.props.value) block = this.props.value.block || this.props.value.get('block')

    block = block || {
      blockId: uuid(),
      vAlign: 'middle',
      hAlign: 'center',
      backgroundImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000',
      backgroundImageTransparency: 0,
      backgroundImagePosition: 50,
      autoLayoutMarginX: 30,
      autoLayoutMarginY: 30,
      blockHeightType: 'auto',
      blockHeightVh: 75,
      blockHeightPx: 600,
      blockHeightFixedMobile: true,
      backgroundColorType: 'color',
      backgroundColor: {r:247,g:57,b:43,a:0.5},
      backgroundColor2: {r:247,g:57,b:43,a:0.5},
      backgroundColorGradientAngle: 45,
      backgroundBlendMode: 'normal',
      filterStyle: 'duotone',
      duotonePreset: null,
      duotoneBackgroundImageTransparency: 20,
      duotoneBackgroundColorType: 'color',
      duotoneBackgroundColor: {r:247,g:57,b:43,a:0.5},
      duotoneBackgroundColor2: {r:247,g:57,b:43,a:0.5},
      duotoneBackgroundColorGradientAngle: 45,
      duotoneColorType: 'color',
      duotoneBackgroundBlendMode: 'multiply',
      duotoneForegroundBlendMode: 'lighten',
      duotoneColor: {r:22,g:0,b:111,a:1},
      duotoneColor2: {r:22,g:0,b:111,a:1},
      duotoneColorGradientAngle: 45,
      backgroundGradient: true,
      backgroundGradientColor: {r:0,g:0,b:0,a:1},
      backgroundGradientTransparency: 50,
      backgroundGradientSize: 25,
      backgroundGradientPosition: 'top',
      mode: null,
      initialJSON: {},
      buildInSteps: [],
      buildOutSteps: [],
      elements: []
    }

    this.svgBuilder = SvgBuilder({
      block: typeof block === 'string' ? JSON.parse(block) : block,
      editable: true,
      showDelete: false,
      showHeight: false
    })

    var self = this

    this.svgBuilder.$on('open-image-picker', function() {
      self.openMediaLibrary()
    })
    
    this.svgBuilder.$on('save', function(data) {
      var htmlOutput = SvgBuilder({
        block: data.block,
        editable: false
      })

      htmlOutput.$on('rendered', function() {
        var html = self.el.querySelector('.superhero-editor > div.html > div').innerHTML
        self.props.onChange({
          block: JSON.stringify(data.block),
          html: html
        })
        htmlOutput.$destroy()
        self.props.closeEditor()        
      })

      htmlOutput.$mount(self.el.querySelector('.superhero-editor > div.html > div'))
    })

    this.svgBuilder.$on('cancel', function () {
      self.props.closeEditor()
    })

    this.svgBuilder.$mount(this.el.querySelector('.superhero-editor > div.editor'))
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.mediaPaths.get(this.controlID) !== this.props.mediaPaths.get(this.controlID)) {
      console.log(this.props.mediaPaths.get(this.controlID)) // image src
      this.svgBuilder.block.backgroundImage = this.props.mediaPaths.get(this.controlID)
    }
  }

  openMediaLibrary() {
    this.props.onOpenMediaLibrary({
      controlID: this.controlID,
      forImage: true,
      privateUpload: undefined,
      value: "",
      allowMultiple: false,
      config: undefined
    })
  }

/*
      this.props.onChange({
        block: JSON.stringify(block),
        html
      })
  
      this.openMediaLibrary()

*/

  render() {

    let captureKeyPress = this.props.open ? (<CaptureKeyPress keyCode={27} onKeyPress={this.props.closeEditor} />) : null;

    let editorClass = `superhero-editor ${this.props.open ? "open" : "closed"}`

    let editor = (
      <div className={editorClass}>
        <div class="editor"></div>
        <div class="html"><div></div></div>
      </div>
    )

    return ReactDOM.createPortal(
      editor,
      this.el,
    );
  }
}