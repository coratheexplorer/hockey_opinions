var Quiz = function(){
  var self = this;
  this.init = function(){
    self._bindEvents();
  }
  
  this.correctAnswers = [
    { question: 1, answer: 'a' },
    { question: 2, answer: 'd' },
    { question: 3, answer: 'b' },
    { question: 4, answer: 'c' },
    { question: 5, answer: 'f' },
    { question: 6, answer: 'e' },
  ]
  
  this._pickAnswer = function($answer, $answers){
    $answers.find('.quiz-answer').removeClass('active');
    $answer.addClass('active');
  }
  this._calcResult = function(){
    var numberOfCorrectAnswers = 0;
    $('ul[data-quiz-question]').each(function(i){
      var $this = $(this),
          chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer'),
          correctAnswer;
      
      for ( var j = 0; j < self.correctAnswers.length; j++ ) {
        var a = self.correctAnswers[j];
        if ( a.question == $this.data('quiz-question') ) {
          correctAnswer = a.answer;
        }
      }
      
      if ( chosenAnswer == correctAnswer ) {
        numberOfCorrectAnswers++;
        
     
        $this.find('.quiz-answer.active').addClass('correct');
      }
      else {
        $this.find('.quiz-answer[data-quiz-answer="'+correctAnswer+'"]').addClass('correct');
        $this.find('.quiz-answer.active').addClass('incorrect');
      }
    });
    if ( numberOfCorrectAnswers < 3 ) {
      return {code: 'bad', text: 'YOU ARE A TERRIBLE PERSON WITH HORRIBLE JUDGEMENT'};
    }
    else if ( numberOfCorrectAnswers == 3 || numberOfCorrectAnswers == 4 ) {
      return {code: 'mid', text: 'NOT IMPRESSED DO BETTER BUDDY'};
    }
    else if ( numberOfCorrectAnswers == 5 ) {
      return {code: 'good', text: 'NOT BAD JUST A LITTLE WORRIED ABOUT WHAT YOU GOT WRONG'};
      else if ( numberOfCorrectAnswers == 5 ) {
      return {code: 'terrific', text: 'I RESPECT YOU'};
    }
  }
  this._isComplete = function(){
    var answersComplete = 0;
    $('ul[data-quiz-question]').each(function(){
      if ( $(this).find('.quiz-answer.active').length ) {
        answersComplete++;
      }
    });
    if ( answersComplete >= 6 ) {
      return true;
    }
    else {
      return false;
    }
  }
  this._showResult = function(result){
    $('.quiz-result').addClass(result.code).html(result.text);
  }
  this._bindEvents = function(){
    $('.quiz-answer').on('click', function(){
      var $this = $(this),
          $answers = $this.closest('ul[data-quiz-question]');
      self._pickAnswer($this, $answers);
      if ( self._isComplete() ) {
        
        // scroll to answer section
        $('html, body').animate({
          scrollTop: $('.quiz-result').offset().top
        });
        
        self._showResult( self._calcResult() );
        $('.quiz-answer').off('click');
        
      }
    });
  }
}
var quiz = new Quiz();
quiz.init();