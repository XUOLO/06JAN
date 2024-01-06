var SchemaUser = require('../schema/department')

module.exports = {
    getall: function (query) {
        var sort = {};
        var Search = {};
        if (query.sort) {
            if (query.sort[0] == '-') {
                sort[query.sort.substring(1)] = 'desc';
            } else {
                sort[query.sort] = 'asc';
            }
        }
        if (query.key) {
            Search.userName = new RegExp(query.key, 'i');
        }
        var limit = parseInt(query.limit) || 2;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;
        return SchemaUser.find(Search).select('name  _id').sort(sort).skip(skip).exec();
    },
    getOne:function(id){
        return SchemaUser.findById(id);
    },
    getByName:function (name){
        return SchemaUser.findOne({}).exec();
    },
    createproduct:function(product){
        return new SchemaUser(product).save();
    },findByIdAndUpdate: function (id, updateData) {
        return SchemaUser.findOneAndUpdate(id, updateData, { new: true }).exec();
    },
    delete: function (id) {
        return SchemaUser.findOneAndDelete(id).exec();
      }
}