const messages = require('../repositories/messages');

function findMessage(senderId){
  const err = null;
  if (typeof senderId === 'undefined'){
    err = new Error('senderId is undefined');
  }

  let index;
  const message = messages.find((el, ind) => {
    if (el.senderId === senderId){
      index = ind;
      return true;
    } else {
      return false;
    }
  });
  return {message, index, err};
}

module.exports = {
  findAll: (callback) => {
    callback(null, messages);
  },

  findOne: (senderId, callback) => {
    const {err, message} = findMessage(senderId);
    callback(err, message);
  },

  add: (message, callback) => {
    if (typeof message.senderId !== 'undefined'){
      messages.push(message);
      callback(null);
    } else {
      callback(new Error('message doesnt have senderId'));
    }
  },

  findOneAndDelete: (senderId, callback) => {
    let {err, message, index} = findMessage(senderId);
    if (typeof index !== 'undefined'){
      messages.splice(index, 1);
    } else {
      err = new Error('no messages with such index');
    }
    callback(err);
  },

  findOneAndUpdate: (senderId, message, callback) => {
    const {err, index} = findMessage(senderId);
    messages[index] = Object.assign(messages[index], message);
    callback(err);
  }
};