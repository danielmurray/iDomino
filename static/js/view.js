// Views, all inherit BaseView
var BaseView = Backbone.View.extend({
  initialize: function() {
  },

  assign: function(view, selector) {
    view.setElement(this.$(selector));
  },

  route: function(part, remaining) {
    return {};
  },

  dispose: function() {
    this.remove();
    this.off();
    if (this.model) {
      this.model.off(null, null, this);
    }
  }
});

var HomeView = BaseView.extend({
  el: "#viewport",
  events: {

  },
  initialize: function() {
    var that = this;
    this.template = loadTemplate("/static/views/nav.html");
  },
  route: function(part, remaining) {
    
    if (!part) {
      navigate("iDomino-6", false); // don't trigger nav inside route
    }

    domino = new DominoView()

    return {
      "#domino-wrapper": domino
    };    
    

  },
  render: function() {
    var renderedTemplate = this.template();
    this.$el.html(renderedTemplate);
  }
});

var DominoView = BaseView.extend({
  el: 'div',
  events: {
    "click .rotate-left": "rotateLeft",
    "click .rotate-right": "rotateRight",
    "click .generate": "generate", 
  },
  generate: function(){
    this.shuffle();
    this.render();
  },
  rotateLeft: function(){
    this.rotate('counter');
  },
  rotateRight: function(){
    this.rotate('clockwise');
  },
  rotate: function(direction){
    console.log(direction)
    if( direction == 'clockwise'){
      if( this.orientation == 'horizontal'){
        this.orientation = 'vertical'
      } else {
        temp = this.face1
        this.face1 = this.face2
        this.face2 = temp
        this.orientation = 'horizontal'
      } 
    } else {
      if( this.orientation == 'horizontal'){
        temp = this.face1
        this.face1 = this.face2
        this.face2 = temp
        this.orientation = 'vertical'
      } else {
        this.orientation = 'horizontal'
      } 
    }   
    this.render()
  },
  initialize: function() {
    var that = this;
    this.template = loadTemplate("/static/views/domino.html");
    this.orientation = 'horizontal';    
    this.face1 = 6;    
    this.face2 = 6;
    this.shuffle();   
  },
  route: function(part, remaining) {


  },
  render: function() {
    face1 = this.dominoDots(this.face1, this.orientation)
    face2 = this.dominoDots(this.face2, this.orientation)
    console.log(face1,face2)
    var renderedTemplate = this.template({
      face1Dots: face1,
      face2Dots: face2,
      orientation: this.orientation
    });
    this.$el.html(renderedTemplate);
  },
  shuffle: function(){
    this.face1 = Math.floor(7 * Math.random())
    this.face2 = Math.floor(7 * Math.random())
  },
  dominoDots: function(number, orientation){
    switch(number) {
        case 0:
            return [];
        case 1:
            return [4];
        case 2:
            if(orientation == 'horizontal')
              return [2,6]
            else
              return [0,8]
        case 3:
            if(orientation == 'horizontal')
              return [2,4,6]
            else
              return [0,4,8]
        case 4:
            return [0,2,6,8];
        case 5:
            return [0,2,4,6,8];
        default:
          if(orientation == 'horizontal')
            return [0,1,2,6,7,8]
          else
            return [0,2,3,5,6,8]
    }
  },
});
