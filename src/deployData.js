const path = require('path');

/**
 * 防止文件未加载，所做的补救措施
 * @param  {[type]} fileKey [description]
 * @return {[type]}         [description]
 */
var initFile = function(fileKey,that){
    that[fileKey] = require(path.join(path.resolve('./sysDic'),`${fileKey}.json`));
};

/**
 * 根据对象key获取数据
 * @param  {string} filename 查询的文件名对象
 * @param  {string} key      对应的key值
 * @return {[type]}          [description]
 */
var getKeyName = function(filename,key) {
    if(!this[filename]){ initFile(filename,this);}
    if(!this[filename][key]){
      throw new Execption('找不到可用对象');
    }
    return this[filename][key].keyname;
};

var getData = function(filename,key) {
  if(!this[filename]){ initFile(filename,this);}
  if(!this[filename][key]){
    throw new Execption('找不到可用对象');
  }
  return this[filename][key];
};

var translateObject = function(obj, translateParams,that) {
  for (var key in obj) {
    if(!translateParams[key]){ continue;}
    var tran = translateParams[key];
    obj[tran.as] = that[tran.from][obj[key]][tran.displayvalue];
  }
};

var translateArray = function(array, translateParams,that) {
    array.map(a => {
      translateObject(a,translateParams,that);
    });
};

/**
 * [function 用于处理数据翻译]
 * @param  {object} dataSource [数据源]
 * @param  {[array]} params     [key：value描述，例：{dept_id|dpts|keyname|deptName},@1:需要翻译的列,@2:指向可用于翻译的文件，@翻译输出字段，默认keyname]
 * @return {object}            [将翻译后的数据返回]
 */
var translate = function(dataSource, params) {
    if (!Array.isArray(params)) {
        return {
            error: '传递翻译文件无效'
        };
    }
    var translateParams = {};
    params.map(p => {
        var p_array = p.split('|');
        var k = p_array[0];
        p_array[2] = p_array[2] || 'keyname';
        translateParams[k] = {
            key: p_array[0] || null,
            from: p_array[1] || null,
            displayvalue: p_array[2] || 'keyname',
            as: p_array[3] || p_array[2]
        };
        if(!this[translateParams[k].from]){
          initFile(translateParams[k].from,this);}
    });
    //start translate
    if(Array.isArray(dataSource)){
      translateArray(dataSource,translateParams,this);
    }else {
      translateObject(dataSource,translateParams,this);
    }
    return dataSource;
};

module.exports.translate = translate;
module.exports.getKeyName = getKeyName;
module.exports.getData = getData;
