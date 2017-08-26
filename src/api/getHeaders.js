const headers = function() {
  let storage=window.localStorage;
  function getStorage(name) {
    return storage.getItem(name) || '';
  }
  //获取本地存储的
  function getStorages(obj) {
    if (typeof obj !== 'object') {
      console.error('此方法需要一个对象');
      return false;
    }
    let objType = Object.prototype.toString.call(obj);
    //结果用一个对象来表示
    let res = {};
    if (objType === '[object Array]') {
      for (var i of obj) {
        let val = getStorage(i);
        res[i] = val;
      }
    } else if (objType === '[object Object]') {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          res[i] = getStorage(obj[i]);
        }
      }
    }
    return res;
  }
  return getStorages(['deviceId','Authorization']);
};
export default headers;
