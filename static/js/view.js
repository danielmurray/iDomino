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
      navigate("home", false); // don't trigger nav inside route
    }

    //Edit this line to the name of the most root view
    //viewToBeReturned = new SiteView()

    return {
      //"#dashboard-wrapper": viewToBeReturned
    };    
    

  },
  render: function() {
    var renderedTemplate = this.template({});
    this.$el.html(renderedTemplate);
  },
  navigateTo: function(click){
    
    var that = click.currentTarget;

    //How do I improve this This information is written in HTML
    var next = $(that).context.classList[2];

    if(this.currentpane.id != next){
      navigate(next, false); 
    }
  }
});

