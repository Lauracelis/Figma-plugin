figma.showUI(__html__, {width:320, height:640, title:"Generador de color"});

figma.ui.onmessage = msg => {
  if(msg.type === 'actionGenerate') {
    const {circleSize, circleSpacing, colorCode, colorName, frameDirection, tintNumber}= msg.formDataObj

    const parentFrame = figma.createFrame()

    parentFrame.name = 'tints for the ' + colorName + ' color'

    parentFrame.layoutMode = frameDirection.toUpperCase()
    parentFrame.paddingLeft= 64
    parentFrame.paddingRight= 64
    parentFrame.paddingTop= 64
    parentFrame.paddingBottom= 64

    parentFrame.itemSpacing = parseInt(circleSpacing)

    parentFrame.primaryAxisSizingMode ='AUTO'
    parentFrame.counterAxisSizingMode ='AUTO'

    const hexToRgb = (hex: string) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

      return result ? {
        r: parseInt(result[1],16),
        g: parseInt(result[2],16),
        b: parseInt(result[3],16)
      } : null
    }

    const colorObj = hexToRgb(colorCode)

    const colorR = colorObj?.r ? colorObj.r/255 : 0
    const colorG = colorObj?.g ? colorObj.g/255 : 0
    const colorB = colorObj?.b ? colorObj.b/255 : 0

    for (let i= 0; i < tintNumber; i++){
      const tintNode = figma.createEllipse()

      tintNode.name = colorName + ' ' + (100-i*10)

      tintNode.resize(parseInt(circleSize), parseInt(circleSize))

      tintNode.fills= [{type: 'SOLID', color:{r: colorR, g: colorG, b: colorB}}]

      tintNode.opacity = (100-i*10)/100

      parentFrame.appendChild(tintNode)

      const selectFrame : FrameNode[]=[]
      selectFrame.push(parentFrame)

      figma.currentPage.selection = selectFrame
      figma.viewport.scrollAndZoomIntoView(selectFrame)
    }
  
    figma.closePlugin('Han sido generados satisfactoriamente')
  }else if(msg.type === 'actionExit'){
    figma.closePlugin()
  }
}

//figma.closePlugin()