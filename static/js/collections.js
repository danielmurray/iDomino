// Collection definitions
var BaseCollection = Backbone.Collection.extend({
  model: BaseModel,
  _order_by: 'id',
  _descending: 1,
  unit: '',
  comparator: function(device) {
    return this._descending * device.get(this._order_by);
  },
  _sortBy: function(orderOn,descending){
    
    if(descending)
      this._descending = -1;
    else
      this._descending = 1;

    this._order_by = orderOn;
    this.sort();
  }
})