socket.on('open', function (message) {
  switch (message.content) {
    /*case 'Navigator-simulator':
     if (message.sessname == name){
      sendSimulatorLog();}
      break;
    case 'Navigator-information':
     if (message.sessname == name){
      sendInformationLog();}
      break;
    case 'Navigator-scratch':
     if (message.sessname == name){
      sendScratchLog();}
      break;
    case 'Navigator-problem-map':
     if (message.sessname == name){
      sendProblemMapLog();}
      break;*/
    case 'Navigator-logout':
    if (message.sessname == name){
      sel_logout();}
      break;
    case 'Navigator-scribble-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-about-play':
      //console.log("session:"+ message.txt);
      if (message.sessname == name){
        play_video();
      }
      break;
    case 'Navigator-about-pause':
    if (message.sessname == name){
         pause_video();
      }
      break;
    case 'Navigator-about-btn':
    if (message.sessname == name){
      modal.style.display = "block";}
      break;
    case 'Navigator-about-close':
    if (message.sessname == name){
      modal.style.display = "none";}
      break;
    case 'Navigator-information-doc':
    if (message.sessname == name){ 
      openpdf();}
      break;
    case 'Navigator-simulator-open':
    if (message.sessname == name){
      openOnepage();}
      break;
    case 'Navigator-simulator-vid1':
    if (message.sessname == name){
      open_video_one();}
      break;
    case 'Navigator-simulator-vid2':
    if (message.sessname == name){
      open_video_two();}
      break;
    case 'Navigator-simulator-hint':
    if (message.sessname == name){
      showhint();}
      break;
    case 'Navigator-simulator-screen2-sel1':
    if (message.sessname == name){
      showgraphlow();}
      break;
    case 'Navigator-simulator-screen2-sel2':
    if (message.sessname == name){
      showgraphmed();}
      break;
    case 'Navigator-simulator-screen2-sel3':
    if (message.sessname == name){
     showgraphhigh();}
      break;
    case 'Navigator-simulator-screen2-hint':
    if (message.sessname == name){
      showhint();}
      break;
    case 'Navigator-simulator-screen2-back':
    if (message.sessname == name){
      openZeropage();}
      break;
    case 'Navigator-simulator-screen2-next':
    if (message.sessname == name){
      openTwopage();}
      break;
    case 'Navigator-simulator-screen3-hint':
    if (message.sessname == name){
      showhint();}
      break;
    case 'Navigator-simulator-screen3-vid':
    if (message.sessname == name){
      open_video_one();}
      break;
    case 'Navigator-simulator-screen3-shape':
    if (message.sessname == name){
      showGraphshape();}
      break;
    case 'Navigator-simulator-screen3-mass':
    if (message.sessname == name){
      showGraphmass();}
      break;
    case 'Navigator-simulator-screen3-acc':
    if (message.sessname == name){
      showGraphacc();}
      break;
    case 'Navigator-simulator-screen3-vmax':
    if (message.sessname == name){
      showGraphvmax();}
      break;
    case 'Navigator-simulator-screen3-massDec':
    if (message.sessname == name){
      mass_dec();}
      break;
    case 'Navigator-simulator-screen3-massInc':
    if (message.sessname == name){
      mass_inc();}
      break;
    case 'Navigator-simulator-screen3-accDec':
    if (message.sessname == name){
      acc_dec();}
      break;
    case 'Navigator-simulator-screen3-accInc':
    if (message.sessname == name){
      acc_inc();}
      break;
    case 'Navigator-simulator-screen3-shapeDec':
    if (message.sessname == name){
      shape_dec();}
      break;
    case 'Navigator-simulator-screen3-shapeInc':
    if (message.sessname == name){
     shape_inc();}
      break;
    case 'Navigator-simulator-screen3-vmaxDec':
    if (message.sessname == name){
      vmax_dec();}
      break;
    case 'Navigator-simulator-screen3-vmaxInc':
    if (message.sessname == name){
       vmax_inc();}
      break;
    case 'Navigator-simulator-screen3-back':
     if (message.sessname == name){
      openOnepage();}
      break;
    case 'Navigator-simulator-screen3-next':
    if (message.sessname == name){
      openThreepage();}
      break;
    case 'Navigator-simulator-screen4-hint':
    if (message.sessname == name){
      showhint();}
      break;
    case 'Navigator-simulator-screen4-back':
    if (message.sessname == name){
      openTwopage();}
      break;
    case 'Navigator-simulator-screen4-current-change':
    if (message.sessname == name){
      currentChanged(message.text);}
      break;
    case 'Navigator-simulator-screen4-voltage-change':
    if (message.sessname == name){
      voltageChanged(message.text);}
      break;
    case 'Navigator-simulator-screen4-motor-change':
    if (message.sessname == name){
      changeMotor(message.text);}
      break;
    /*case 'Navigator-next':
    if (message.sessname == name){
      console.log(message.nexturl);
      logRecordAndJump(message.nexturl);}
      break;
    case 'Navigator-submit-question':
    if (message.sessname == name){
      console.log("show modal " + message.text);
      $('#explain0').val(message.text);}
      break;
    case 'Navigator-func-fail-close':
    if (message.sessname == name){
      modal.style.display = "none";}
      break;
    case 'Navigator-func-fail-btn':
    if (message.sessname == name){
      modal.style.display = "block";}
      break;*/
    default:
      console.log("unknown socket message, was: " + message.content);
  }
});

socket.on('close', function (message) {
  switch (message.content) {
    case 'Navigator-close-window':
    if (message.sessname == name){
      window.close();}
      break;
    default:
      console.log("unknown socket message, was: " + message.content);
  }
});
