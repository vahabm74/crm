jQuery(document).ready(function($) {
  //colapse sidebar menu
  $('#main .right .header .colapse').click(function() {
    $('#main .right').toggleClass('open');
    $("#main .left,#main .left .header-section").toggleClass('cc');

  });
  //Show details of items after click it
  $('#main .left .items .box h2').click(function () {
    $(' > i',this).toggleClass('turn');
    let details = $(this).closest('.box').find('.details');
    $(details).slideToggle(200);
    $(this).parent('.box').toggleClass('open');
  });
  //sort Ticket tables
  let table = $('#main .left .all .tickets .content table,#main .left .all-ticket-tb');
  $('#answers-ticket, #dates-ticket, #priorities-ticket, #status-ticket, #kinds-ticket, #do-ticket, #creator-ticket, #project-ticket')
    .wrapInner('<span title="sort this column"/>')
    .each(function(){
        var th = $(this),
            thIndex = th.index(),
            inverse = false;
        th.click(function(){
            table.find('td').filter(function(){
                return $(this).index() === thIndex;
            }).sortElements(function(a, b){
                return $.text([a]) > $.text([b]) ?
                    inverse ? -1 : 1
                    : inverse ? 1 : -1;
            }, function(){
                return this.parentNode;
            });
            inverse = !inverse;
        });
    });
    $('#main .left .all .tickets .content table thead tr th[id],#main .left .all-ticket-tb thead tr th[id]').click(function() {
      $(this).toggleClass('sort');
    });

    //tooltip subject tickets
    $('#main .left .all .tickets .content table tbody tr td.ticket-subject,#main .left .all-ticket-tb tbody tr td.subject-ticket').hover(function() {
      let title = $(this).text();
      $('#main .left .all .tickets .title h3').append('<span class="show-tooltip">('+title+')</span>');
    },function () {
      $('#main .left .all .tickets .title h3').find('.show-tooltip').remove();
    });
    $('#main .left .all .tickets .content-ticket .info-ticket li p.info-ticket-task-value').hover(function() {
      let tititle = $(this).text();
      $('#main .left .all .tickets .title .tts').text(' ('+tititle+')');
    },function(){
      $('#main .left .all .tickets .title .tts').text('');
    });
    //Reply box show and hide
    $('#main .left .all .tickets .title .new-reply').click(function () {
      $('#main .left').css({'overflow':'hidden'});
      $('#main .left .overlay').fadeIn();
      $('#main .left .all .tickets .content-ticket #reply').addClass('show');
    });
    $('#main .left .overlay,#main .left .all .tickets .content-ticket #reply i,#main .left .all #new-note i,#main .left .all .tickets .history-ticket i').click(function () {
      $('#main .left').css({'overflow':'auto'});
      $('#main .left .overlay').fadeOut();
      $('#main .left .all .tickets .content-ticket #reply').removeClass('show');
      $('#main .left .all #new-note').fadeOut(200);
      $('#main .left .all .tickets .history-ticket').fadeOut(200);
      $('#main .timer-box').fadeOut();
    });

    //History ticket box show and hide
    $('#main .left .all .tickets .title .new-ticket').click(function(){
      $('#main .left').css({'overflow':'hidden'});
      $('#main .left .overlay').fadeIn();
      $('#main .left .all .tickets .history-ticket').fadeIn(200);
    });

    //open and close note
    $('#main .left .all .notes .list-notes .note .n-subject .n-right').click(function () {
      let parent = $(this).closest('.note');
      $(' > .n-content',parent).slideToggle(200);
      $(this).find('i').toggleClass('show');
    });

    //open new note box
    $('#main .left .all .notes .title a').click(function() {
      $('#main .left').css({'overflow':'hidden'});
      $('#main .left .overlay').fadeIn();
      $('#main .left .all #new-note').fadeIn(200);
    });
    $('#main .left .all .tickets .title .new-note').click(function() {
      $('#main .left .all .notes').fadeIn(200);
    });
    $('#main .left .all .notes .title h3 i').click(function() {
      $('#main .left .all .notes').fadeOut(200);
    });
    //Check color note
    $('#main .left .all #new-note .note-content .note-footer p label').click(function() {
      $('#main .left .all #new-note .note-content .note-footer p label').html('');
      $(this).html('<i class="fas fa-check"></i>');
    });

    //every note check 'data-bgcolor' and add to it's style
      $('#main .left .all .notes .list-notes .note').css('background',function () {
        return $(this).attr('data-bgcolor')
      });
      $('#main .left .all #new-note .note-content .note-footer p label').click(function () {
        let id = $(this).attr('data-color');
        $('#main .left .all #new-note .note-content textarea,#main .left .all #new-note .note-content .trumbowyg-box .trumbowyg-editor').css({'background':id});
        $('#main .left .all #new-note .note-content textarea').attr('data-color',id);
      });
    //new select box style
    if($("#note-username").length !== 0){
      NiceSelect.bind(document.getElementById("note-username"),{
        searchable: false
      });
    }
    if($("#user-reply").length !== 0){
      NiceSelect.bind(document.getElementById("user-reply"),{
        searchable: false
      });
    }
    if($("#priority-reply").length !== 0){
      NiceSelect.bind(document.getElementById("priority-reply"),{
        searchable: false
      });
    }
    if($("#info-ticket-status-select").length !== 0){
      NiceSelect.bind(document.getElementById("info-ticket-status-select"),{
        searchable: false
      });
      NiceSelect.bind(document.getElementById("info-ticket-user-value-select"),{
        searchable: false
      });
      NiceSelect.bind(document.getElementById("info-ticket-priority-value-select"),{
        searchable: false
      });
    }
    if($('.filter-tickets .ticket-name').length !== 0){
      NiceSelect.bind(document.getElementById("ticket-name"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("ticket-user"),{
        searchable: false
      });
      NiceSelect.bind(document.getElementById("ticket-status"),{
        searchable: false
      });
      NiceSelect.bind(document.getElementById("ticket-kind"),{
        searchable: false
      });
      NiceSelect.bind(document.getElementById("ticket-priority"),{
        searchable: false
      });
    }
    if($('.filter-tickets .box').length !== 0){
      NiceSelect.bind(document.getElementById("filter-day"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("filter-month"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("filter-work"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("filter-project"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("filter-ticket"),{
        searchable: false,
      });
    }
    if($('.set-timer').length !== 0){
      NiceSelect.bind(document.getElementById("project-n"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("project-t"),{
        searchable: false,
      });
      NiceSelect.bind(document.getElementById("project-task"),{
        searchable: false,
      });
    }
    //ticket time hover description
    $('#main .left .all-ticket-t .time-main .right-t ul li.description').hover(function() {
      let txt = $(this).text();
      $(this).closest('.right-t').append('<span class="desc">'+txt+'</span>');
    },function() {
      $(this).closest('.right-t').find('span').remove();
    });
    //set timer click functions
    $('#main .set-timer').click(function() {
      // $(this).toggleClass('start');
      $(this).hide();
      $('#main .set-timer-end').css({'display':'flex'});
      $('#main .set-timer-end').find('.counter').fadeIn();
      var sec = 0;
      function pad ( val ) { return val > 9 ? val : "0" + val; }
      counter = setInterval( function(){
          var secs = pad(++sec%60);
          var mins = pad(parseInt(sec/60,10));
          $('#main .set-timer-end .counter').html(mins+':'+secs);
      }, 1000);
    });
    $('#main .set-timer-end').click(function() {
       $(this).hide();
       $('#main .set-timer').css({'display':'flex'});
       $('.timer-box').delay(200).fadeIn(200);
       $('.overlay').fadeIn(0);
       $('#main .left').css({'overflow':'hidden'});
       clearInterval(counter);
       var saveTime = $(this).find('.counter').text();;
       $('.savetime').val(saveTime);
    });
    $('#main .timer-box h2 i').click(function () {
      $('.timer-box').fadeOut(0);
      $('.overlay').delay(200).fadeOut(0);
      $('#main .left').css({'overflow':'auto'});
    });
    //click to show notif box
    $('#main .left .header .notification > ul li').click(function(){
      $('#main .left .header .notification .notif-box').slideToggle(200);
    });
    //new texteditor jquery
    if($('.new-reply').length !== 0){
      $('#reply-text').trumbowyg({
        btnsDef: {
           // Create a new dropdown
           image: {
               dropdown: ['insertImage', 'base64'],
               ico: 'insertImage'
           }
       },
       // Redefine the button pane
       btns: [
           ['viewHTML'],
           ['formatting'],
           ['strong', 'em'],
           ['link'],
           ['image'], // Our fresh created dropdown
           ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
           ['unorderedList', 'orderedList'],
           ['horizontalRule'],
           ['removeformat'],
           ['fullscreen'],
           ['foreColor', 'backColor'],
           ['highlight']
       ]
      });
      $('#note-text').trumbowyg({
        btnsDef: {
           // Create a new dropdown
           image: {
               dropdown: ['insertImage', 'base64'],
               ico: 'insertImage'
           }
       },
       // Redefine the button pane
       btns: [
           ['viewHTML'],
           ['formatting'],
           ['strong', 'em'],
           ['link'],
           ['image'], // Our fresh created dropdown
           ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
           ['unorderedList', 'orderedList'],
           ['horizontalRule'],
           ['removeformat'],
           ['fullscreen'],
           ['foreColor', 'backColor'],
           ['highlight']
       ]
      });
    }
    //Close alert profile
    $('#main .left .profile .profile-content .alert-profile i:last-child').click(function() {
      $(this).closest('.alert-profile').hide(200);
    });
});
