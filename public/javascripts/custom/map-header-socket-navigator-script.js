socket.on('open', function (message) {
  switch (message.content) {
    case 'Navigator-simulator':
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
      break;
    case 'Navigator-problem-log':
     if (message.sessname == name){
        if (mnuOut){
          //Menu is visible, so HIDE menu
          $('#myMenu').animate({
            right: '-200px'
          },800);
          mnuOut = false;
     }
      else{
          //Menu is hidden, so SHOW menu
          $('#myMenu').animate({
            right: 0
          },800);
          mnuOut = true;
      }}
      break;
    case 'Navigator-logout':
    if (message.sessname == name){
      sel_logout();}
      break;
    case 'Navigator-clear-input':
    if (message.sessname == name){
      $(message.text).val('');}
      break;
    case 'Navigator-func':
      //console.log("session:"+ message.txt);
      if (message.sessname == name){
        openfunc();
      }
      break;
    case 'Navigator-func-eval':
    if (message.sessname == name){
      openfunceval();}
      break;
    case 'Navigator-func-eval-dom-hint1':
    if (message.sessname == name){
      openhint2();
    }
    break;
    case 'Navigator-func-eval-dom-hint2':
    if (message.sessname == name){ 
      openhint3();}
      break;
    case 'Navigator-func-model':
    if (message.sessname == name){
      openfuncmodel();}
      break;
    case 'Navigator-func-plan':
    if (message.sessname == name){
      openfuncplan();}
      break;
    case 'Navigator-func-dom':
    if (message.sessname == name){
      openfuncdom();}
      break;
    case 'Navigator-func-prompt':
    if (message.sessname == name){
      openfuncprompts();}
      break;
    case 'Navigator-func-fail':
    if (message.sessname == name){
      clickIncludedOneButton();}
      break;
    case 'Navigator-qual':
    if (message.sessname == name){
      openqual();}
      break;
    case 'Navigator-qual-model':
    if (message.sessname == name){
      load();}
      break;
    case 'Navigator-qual-eval':
    if (message.sessname == name){
      openqualeval();}
      break;
    case 'Navigator-qual-plan':
    if (message.sessname == name){
      openqualplan();}
      break;
    case 'Navigator-qual-plan-hint':
    if (message.sessname == name){
      openhint();}
      break;
    case 'Navigator-qual-dom':
    if (message.sessname == name){
      openqualdom();}
      break;
    case 'Navigator-qual-eval-dom-hint':
    if (message.sessname == name){
      openhint2();}
      break;
    case 'Navigator-qual-eval-dom-no1':
    if (message.sessname == name){
      openq3no();}
      break;
    case 'Navigator-qual-eval-dom-yes1':
    if (message.sessname == name){
      openq3no();}
      break;
    case 'Navigator-quant':
    if (message.sessname == name){
      openquant();}
      break;
    case 'Navigator-quant-eval':
    if (message.sessname == name){
      openquanteval();}
      break;
    case 'Navigator-quant-eval-comp':
    if (message.sessname == name){
      openquantevalcomp();}
      break;
    case 'Navigator-quant-plan':
    if (message.sessname == name){
      openquantplan();}
      break;
    case 'Navigator-quant-eval-check-hint':
    if (message.sessname == name){
      openhint1();}
      break;
    case 'Navigator-quant-eval-check-yes1':
    if (message.sessname == name){
      openq1yes();}
      break;
    case 'Navigator-quant-eval-check-yes2':
    if (message.sessname == name){
      openq2yes();}
      break;
    case 'Navigator-quant-eval-check-no1':
    if (message.sessname == name){
      openq1no();}
      break;
    case 'Navigator-quant-eval-check-no2':
    if (message.sessname == name){
      openq2no();}
      break;
    case 'Navigator-quant-eval-comp-yes1':
    if (message.sessname == name){
      openq1yes();}
      break;
    case 'Navigator-quant-eval-comp-yes2':
    if (message.sessname == name){
      openq2yes();}
      break;
    case 'Navigator-quant-eval-comp-no1':
     if (message.sessname == name){
      openq1no();}
      break;
    case 'Navigator-quant-eval-comp-no2':
    if (message.sessname == name){
      openq2no();}
      break;
    case 'Navigator-calc':
    if (message.sessname == name){
      opencalc();}
      break;
    case 'Navigator-calc-add-data':
    if (message.sessname == name){
      $('#myModal').modal("show");}
      break;
    case 'Navigator-calc-save-data':
    if (message.sessname == name){
      add_data();}
      break;
    case 'Navigator-calc-prompt':
    if (message.sessname == name){
      openprompts();}
      break;
    case 'Navigator-calc-close-modal':
    if (message.sessname == name){
      $('#myModal').modal("hide");}
      break;
    case 'Navigator-eval':
    if (message.sessname == name){
      openeval();}
      break;
    case 'Navigator-eval-hint1':
    if (message.sessname == name){
      openq1hint();}
      break;
    case 'Navigator-eval-hint2':
    if (message.sessname == name){
      openq2hint();}
      break;
    case 'Navigator-eval-check-complete':
    if (message.sessname == name){
      $('input[name=opt]')[0].checked = true;}
      break;
    case 'Navigator-eval-check-incomplete':
    if (message.sessname == name){
      $('input[name=opt]')[1].checked = true;}
      break;
    case 'Navigator-eval-submit':
    if (message.sessname == name){
      if(message.text==='1'){
      $('#ExplnModal').modal("show");
             desturl = "/problem/1/tasks/role/evaluation/map";
    }
      else{
        $('#ExplnModal').modal("show");
             desturl = "/problem/1/tasks/role/evaluation/result";
      }}
      break;
   /* case 'Navigator-next':
    if (message.sessname == name){
      console.log(message.nexturl);
      logRecordAndJump(message.nexturl);}
      break;*/
    /*case 'Navigator-submit-question':
    if (message.sessname == name){
      console.log("show modal " + message.text);
      $('#explain0').val(message.text);}
      break;*/
    case 'Navigator-func-model-main-p0':
    if (message.sessname == name){
      $('#problem0').val(message.text);}
      break;
    case 'Navigator-func-eval-check-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-func-eval-check-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-func-model-prompt-p0':
    if (message.sessname == name){
      $('#problem0').val(message.text);}
      break;
    case 'Navigator-func-model-prompt-p1':
    if (message.sessname == name){
      $('#problem1').val(message.text);}
      break;
    case 'Navigator-func-model-prompt-p2':
    if (message.sessname == name){
      $('#problem2').val(message.text);}
      break;
    case 'Navigator-func-model-prompt-p3':
    if (message.sessname == name){
      $('#problem3').val(message.text);}
      break;
    case 'Navigator-func-eval-dom-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-func-eval-dom-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-func-eval-comp-q2':
    if (message.sessname == name){
      $('#question2').val(message.text);}
      break;
    case 'Navigator-func-plan-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-func-plan-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-calc-param':
    if (message.sessname == name){
      $("#param").val(message.text);}
      break;
    case 'Navigator-calc-val':
    if (message.sessname == name){
      $("#p_val").val(message.text);}
      break;
    case 'Navigator-calc-arg':
    if (message.sessname == name){
      $("#argument").val(message.text);}
      break;
    case 'Navigator-calc-q0':
    if (message.sessname == name){
      $("#question1").val(message.text);}
      break;
    case 'Navigator-calc-deletedata':
    if (message.sessname == name){
      //deletedata(message.text);
      document.location.reload();}
      break;
    case 'Navigator-quant-model-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-quant-eval-check-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-quant-eval-check-q2':
    if (message.sessname == name){
      $('#question2').val(message.text);}
      break;
    case 'Navigator-qual-eval-check-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-qual-eval-check-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-qual-eval-check-q2':
    if (message.sessname == name){
      $('#question2').val(message.text);}
      break;
    case 'Navigator-qual-eval-check-q3':
    if (message.sessname == name){
      $('#question3').val(message.text);}
      break;
    case 'Navigator-qual-plan-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-qual-plan-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-qual-plan-q2':
    if (message.sessname == name){
      $('#question2').val(message.text);}
      break;
    case 'Navigator-qual-eval-dom-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-qual-eval-dom-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-quant-eval-comp-q2':
    if (message.sessname == name){
      $('#question2').val(message.text);}
      break;
    case 'Navigator-quant-plan-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-quant-plan-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-eval-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-eval-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-eval-map-q0':
    if (message.sessname == name){
      $('#question0').val(message.text);}
      break;
    case 'Navigator-eval-map-q1':
    if (message.sessname == name){
      $('#question1').val(message.text);}
      break;
    case 'Navigator-eval-map-q2':
    if (message.sessname == name){
      $('#question2').val(message.text);}
      break;
    case 'Navigator-eval-map-q3':
    if (message.sessname == name){
      $('#question3').val(message.text);}
      break;
    case 'Navigator-eval-map-q4':
    if (message.sessname == name){
      $('#question4').val(message.text);}
      break;
    case 'Navigator-func-fail-close':
    if (message.sessname == name){
      modal.style.display = "none";}
      break;
    case 'Navigator-func-fail-btn':
    if (message.sessname == name){
      modal.style.display = "block";}
      break;
    case 'Navigator-done':
    if (message.sessname == name){
      openfrontpage();}
      break;

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
