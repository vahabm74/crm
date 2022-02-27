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
      let tititle = $(this).find('input').val();
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
    $('#main .left .all .tickets .title .new-note').click(function() {
      $('#main .left').css({'overflow':'hidden'});
      $('#main .left .overlay').fadeIn();
      $('#main .left .all #new-note').fadeIn(200);
    });
    // $('#main .left .all .tickets .title .new-note').click(function() {
    //   $('#main .left .all .notes').fadeIn(200);
    // });
    // $('#main .left .all .notes .title h3 i').click(function() {
    //   $('#main .left .all .notes').fadeOut(200);
    // });
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
    if($("#user-reply").length !== 0){
      $('#user-reply,#priority-reply,#status-reply').select2({});
    }
    if($("#info-ticket-status-select").length !== 0){
      $('#info-ticket-user-value-select,#info-ticket-priority-value-select,#info-ticket-status-select').select2();
    }
    if($('.filter-tickets .ticket-name').length !== 0){
      $('#ticket-name,#ticket-user,#ticket-status,#ticket-kind,#ticket-priority').select2({});
    }
    if($('#connection-address').length !== 0){
      $('#connection-way').select2();
    }
    if($('.form-create-project').length !== 0){
      $('#project-customer-p,#project-manager-p,#project-info-p,#project-server-p,#project-content-p,#project-edu-p,#project-category-p,#project-team-p').select2();
    }
    if($('.form-create-ticket').length !== 0){
      $('#ticket-priority-c,#ticket-project-c,#ticket-user-c').select2();
    }
    if($('.filter-tickets .box').length !== 0){
      $('#filter-day,#filter-month,#filter-work,#filter-project,#filter-ticket').select2();
    }
    if($('.set-timer').length !== 0){
      $('#project-n,#project-t,#project-task').select2();
    }
    if($('.ticket-page').length !== 0){
      $('#ticket-number-p').select2({
        minimumResultsForSearch: -1
      });
    }
    if($('.info-user-form').length !== 0){
      $('#user-marrige,#user-graduate,#user-off-day,#user-vacation-kind').select2();
      $('.if-married').css({'display':'none'});
      $('#user-marrige').on('change', function() {
        var selectVal = $(this).find('option:selected').val();
        if (selectVal == 0) {
          $('.if-married').css({'display':'none'});
        } else if (selectVal == 1) {
          $('.if-married').css({'display':'block'});
        }
    });
    }
    //ticket time hover description
    $('#main .left .all-ticket-t .time-main .right-t ul li.description').hover(function() {
      let txt = $(this).text();
      $(this).closest('.right-t').append('<span class="desc">'+txt+'</span>');
    },function() {
      $(this).closest('.right-t').find('span').remove();
    });
    //************************************** Timer **************************************************//
    //set timer click functions
    if (Cookies.get('start-time')) {
        $('#main .set-timer').css({'display': 'none'});
        $('#main .set-timer-end').css({'display': 'flex'});
        $('#main .set-timer-end').find('.counter').fadeIn();
        // var getsecound = $('.savetime').val();
        // console.log(new Date(new Date().getSeconds() - new Date(Cookies.get('start-time'))).getSeconds())
        // $('#main .set-timer-end').find('.counter')
        //     .text(new Date(new Date().getSeconds() - new Date(Cookies.get('start-time'))).getSeconds());

        var sec = Math.floor(new Date(new Date().getTime() - new Date(Cookies.get('start-time'))).getTime() / 1000);

        function pad(val) {
            return val > 9 ? val : "0" + val;
        }

        counter = setInterval(function () {
            var secs = pad(++sec % 60);
            var mins = pad(parseInt(sec / 60, 10));
            $('#main .set-timer-end .counter').html(mins + ':' + secs);
        }, 1000);
    } else {
        $('#main .set-timer').click(function () {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTimes = date + 'T' + time;
            Cookies.set('start-time', dateTimes, {expires: 5 * 60 * 1000});
            $(this).hide();
            $('#main .set-timer-end').css({'display': 'flex'});
            $('#main .set-timer-end').find('.counter').fadeIn();
            var sec = 0;

            function pad(val) {
                return val > 9 ? val : "0" + val;
            }

            counter = setInterval(function () {
                var secs = pad(++sec % 60);
                var mins = pad(parseInt(sec / 60, 10));
                $('#main .set-timer-end .counter').html(mins + ':' + secs);
            }, 1000);
        });
    }

    $('#main .set-timer-end').click(function () {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + 'T' + time;
        let end_ti = Cookies.set('end-time', dateTime);
        $(this).hide();
        $('#main .set-timer').css({'display': 'flex'});
        $('.timer-box').delay(200).fadeIn(200);
        $('.overlay').fadeIn(0);
        $('#main .left').css({'overflow': 'hidden'});
        clearInterval(counter);
        let ss = Math.floor(Math.floor(today.getTime() - new Date(Cookies.get('start-time')).getTime()) / 1000)
        console.log(Math.floor(Math.floor(today.getTime() - new Date(Cookies.get('start-time')).getTime()) / 1000))
        // let space = Math.floor(ss / 1000 % 60);
        // Math.floor(new Date(new Date().getTime() - new Date(Cookies.get('start-time'))).getTime() / 1000)
        $('.savetime').val(ss);
        $('.start-time').val(Cookies.get('start-time'));
        $('.end-time').val(Cookies.get('end-time'));
        Cookies.remove('start-time');
        Cookies.remove('end-time');
        Cookies.remove('between');
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
    if($('#user-address').length !== 0){
      $('#user-request').trumbowyg({
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
       ]
      });
    }
    if($('.form-create-ticket').length !== 0){
      $('#ticket-description-c').trumbowyg({
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
    //show required start on the label
    $('.form-item .rq').append('<span class="star">*</span>');
    //open and close submenu
    $('li.has-child').append('<span class="dropdown"><i class="fas fa-angle-down"></i></span>');
    $('li.has-child .dropdown').click(function(){
      $(this).closest('.has-child').siblings().removeClass('open').find('.submenu').slideUp(200);
      $(this).closest('.has-child').toggleClass('open').find('.submenu').slideToggle(400);
    });
    //Tine chart
    if($('.circle-time').length !== 0){
      var canvas = document.getElementById("mytime");
      let ctx = canvas.getContext('2d');
      var perc = 20;
      var myChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          // labels: ['OK', 'WARNING', 'CRITICAL'],
          datasets: [{
            // label: '# of Tomatoes',
            data: [18, 52, 30],
            backgroundColor: [
              '#e46844',
              '#68a5db',
              '#ffffff'
            ],
            borderColor: [
              '#1e1f71'
            ],
            borderWidth: 1
          }]
        },
        options: {
          // cutoutPercentage: 40,
          responsive: true,
          animation: {
              animateScale: true,
              animateRotate: true,
              onComplete : function() {
                  var cx = canvas.width / 2;
                  var cy = canvas.height / 2;
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.font = '35px tahoma';
                  ctx.fillStyle = 'white';
                  ctx.fillText(perc+"%", cx, cy);
              }
          },
        }
      });
    }
    //user info form
    //input file name
    $(function () {
       $('#main .info-user .info-user-form .user-form .col3 .item input[type="file"]').change(function () {
            if ($(this).val() != "") {
                   $(this).css('color', '#333');
            }else{
                   $(this).css('color', 'transparent');
            }
       });
     });
     //credit card input seperator
     String.prototype.toCardFormat = function () {
          return this.replace(/[^0-9]/g, "").substr(0, 16).split("").reduce(cardFormat, "");
          function cardFormat(str, l, i) {
              return str + ((!i || (i % 4)) ? "" : "-") + l;
          }
     };
     $("#user-credit-card").keyup(function () {
         $(this).val($(this).val().toCardFormat());
     });
});
