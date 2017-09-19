var ObjectID = require('bson').ObjectID;

module.exports = function(RED) {
  function ObjectIdNode(config) {
    RED.nodes.createNode(this, config);

    this.name = config.name;
    this.property = config.property || 'payload';

    this.on('input', msg=> {
      var value;

      try {
        value = RED.util.getMessageProperty(msg, this.property);
      }
      catch (e) {
        node.error(e, msg);
      }

      if (Array.isArray(value)) {
        value = value.map(value=> new ObjectID(value));
      }
      else {
        value = new ObjectID(value);
      }

      RED.util.setMessageProperty(msg, this.property, value, true);

      this.send(msg);
    });
  }

  RED.nodes.registerType('objectid', ObjectIdNode);
}
