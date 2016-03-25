var ctrl = new ScrollMagic.Controller();

function initDateline() {
   var startDate = 0;
   addNewDate("In the beginning..", "");
   for (var i = 4100; i > 0; i = i - 100) {
      addNewDate(startDate + i, " B.C.");
   }
   addNewDate("-1 B.C. - 1 A.D.", "");
   for (var i = 100; i < 105; i = i + 100) {
      addNewDate(startDate + i, " A.D.");
   }
   TweenMax.fromTo("#mainline", 2, {alpha: 0}, {alpha: 1});
}

function shiftDatesUp(strTriggerName) {
   new ScrollMagic
      .Scene({
         triggerElement: strTriggerName,
         duration: 10000
      })
      .setTween(
         TweenMax.to(".dateline-md", 1, {x: "-=5000", ease: Linear.easeNone})
      )
      //.addIndicators()
      .addTo(ctrl);

   new ScrollMagic
      .Scene({
         triggerElement: strTriggerName,
         duration: 10000
      })
      .setTween(
         TweenMax.to(".dateline-sm", 1, {x: "-=5000", ease: Linear.easeNone})
      )
      //.addIndicators()
      .addTo(ctrl);

   new ScrollMagic
      .Scene({
         duration: 10000,
         triggerElement: strTriggerName
      })
      .setTween(
         TweenMax.to(".info", 1, {x: "-=5000", ease: Linear.easeNone})
      )
      .addTo(ctrl);
}

function addNewDate(intNewDate, strSuffix) {
   $linegroup = $('.dateline-md');
   intLength = $linegroup.length + 1;
   pctLeftValue = (20 * intLength) + "%";

   // main year number
   var $newDate = $('<div></div>', {class: "dateline-md"});
   $newDate.text(intNewDate + strSuffix);
   $newDate.css("left", pctLeftValue);
   $('.linegroup').append($newDate);

   // incremental years
   for (var i = 1; i < 11; i = i + 1) {
      var $smLine = $('<div></div>', {class: "dateline-sm"});
      pctLeftValue = (20 * intLength) - (i * 2) + "%";
      $smLine.css("left", pctLeftValue);
      $('.linegroup').append($smLine);
   }
}

function initDateShifter() {
   for (var i = 0; i <= $('.trigger').length; i = i + 1) {
      var strTriggerName = "#tg" + i;
      shiftDatesUp(strTriggerName);
   }
}

function showTimelineTitle() {
   $timeline   = $('timeline');
   $notes      = $('<div></div>', {class: 'notes'})
   $titleNote  = $('<div></div>', {id: 'titleNote'});
   $titleNote.html("<h1>The Bible Timeline</h1>");
   $notes.append($titleNote);

   $timeline.prepend($notes);
   TweenMax.fromTo("#titleNote", 2, {alpha: 0, x: 800, y: 450}, {alpha: 1, ease: Linear.easeNone});
}

function showScrollText() {
   $timeline   = $('timeline');
   $notes      = $('<div></div>', {class: 'notes'})
   $scrollNote = $('<div></div>', {id: 'scroll'});
   $scrollNote.html("<h3>Scroll <span class='fa fa-chevron-down'></span> to move <span class='fa fa-arrow-right'></span></h3>");
   $notes.append($scrollNote);

   $timeline.prepend($notes);
   TweenMax.fromTo("#scroll", 2, {y: "0", x: "800"}, {y: "600", ease: Bounce.easeOut});
}

initDateline();
initDateShifter();
showScrollText();
showTimelineTitle();

// Navigation
$('#navDn').on('click', function(e) {
   TweenMax.to(".info", 0.2, {y: "-=25px", ease: Linear.easeNone});
});
$('#navUp').on('click', function(e) {
   TweenMax.to(".info", 0.2, {y: "+=25px", ease: Linear.easeNone});
});

// menu toggles
var blLegendExpanded = false;
function setLegendIcon() {
   $('#expand').html('<span class="fa fa-times"></span>');
   $('#expand').css('color', '#fff');
}
$('#expand').on('click', function(e) {
   if (blLegendExpanded === false) {
      blLegendExpanded = true;
      $(this).css('background-color', '#888');
      TweenMax.fromTo("#key", 1, {y: 0}, {y: 375, alpha: 1, onComplete:setLegendIcon});
   } else {
      blLegendExpanded = false;
      TweenMax.to("#key", 0, {alpha: 0});
      $(this).css('background-color', '#ccc');
      $(this).css('color', '#000');
      $("#expand").html('<span class="fa fa-list-ul"></span>');
   }
});

TweenMax.to("#settings-menu", 0, {alpha: 0});
var blSettingsOpen = false;
function setSettingsIcon() {
   $('#settings-btn').html('<span class="fa fa-times"></span>');
   $('#settings-btn').css('color', '#fff');
}
$('#settings-btn').on('click', function(e) {
   if (blSettingsOpen === false) {
      blSettingsOpen = true;
      $(this).css('background-color', '#888');
      TweenMax.fromTo("#settings-menu", 1, {x: -500}, {alpha: 1, x: 25, onComplete:setSettingsIcon});
   } else {
      blSettingsOpen = false;
      TweenMax.to("#settings-menu", 0, {alpha: 0});
      $(this).css('background-color', '#ccc');
      $(this).css('color', '#000');
      $('#settings-btn').html('<span class="fa fa-cog"></span>');
   }
});

// settings toggles
var blShowKings = true;
$('#tglKings').on('change', function(e) {
   console.log("toggle the kings");
   if (blShowKings === true) {
      blShowKings = false;
      $('#kings').hide();
   } else {
      blShowKings = true;
      $('#kings').show();
   }
});

var blShowBblComp = true;
$('#tglBblComp').on('change', function(e) {
   console.log("toggle the kings");
   if (blShowBblComp === true) {
      blShowBblComp = false;
      $('#bblComp').hide();
   } else {
      blShowBblComp = true;
      $('#bblComp').show();
   }
});

var blShowBblCov = true;
$('#tglBblCov').on('change', function(e) {
   console.log("toggle the kings");
   if (blShowBblCov === true) {
      blShowBblCov = false;
      $('#bblCov').hide();
   } else {
      blShowBblCov = true;
      $('#bblCov').show();
   }
});