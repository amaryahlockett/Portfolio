var Titler = function ($el) {
    this.$el = $el;
    this.$words = null;
    
    this.wordsArray = $el.html().split('');
  
    this.joinChars();
};

Titler.prototype.joinChars = function () {
    
    var newWords = this.wrapChars(this.wordsArray).join('');
  
    this.$el.html(newWords);
    this.$words = this.$el.children('span');
    this.cascade(this.$words);
};

Titler.prototype.wrapChars = function (words) {
  
    var wrappedWords = [];
  
    for(var i=0; i < words.length; i++) {
      
        var word = words[i] === ' ' ? '&nbsp' : words[i];
        wrappedWords[i] = '<span>' + word + '</span>';
    }
  
    return wrappedWords;
};

Titler.prototype.cascade = function ($el, reverse, time) {
    
    var amount = $el.length;
    
    // defaults
    time = typeof time !== 'undefined' ? time/amount : 300/amount;
    reverse = typeof reverse !== 'undefined' ? reverse : false;

    for(var i = amount; i--;) {

        var index = reverse ? (amount - 1) - i : i;
            delay = i * time;

        $el.eq(index).css('transition-delay', delay.toFixed(2) + 'ms');
    }
}

var titler = new Titler($('.titler')),
    $title = $('.titler');

$('html').on('click', function () {
  
  var hasClass = $title.hasClass('active'),
      reverse = hasClass ? true : false;
  
  if(hasClass) {
    $title.removeClass('active');
  }
  else {
    $title.addClass('active');
  }
  titler.cascade(titler.$words, reverse, 300);
});