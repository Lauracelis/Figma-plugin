figma.showUI(__html__, {width:320, height:640, title:"Generador de color"})


figma.ui.onmessage = msg => {
  if(msg.type === 'actionGenerate') {
    figma.closePlugin('Han sido generados satisfactoriamente')
  }else if(msg.type === 'actionExit'){
    figma.closePlugin()
  }
}
//figma.closePlugin()