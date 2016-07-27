### 使用方法

```
//用于翻译数据源
module.exports.translate = translate;
//翻译单个数据
module.exports.getKeyName = getKeyName;
//获取数据对象
module.exports.getData = getData;
```

**translate**

```
var dataSource = ...;
var option = {
  ['dptid|dpts|keyname|deptName']
};
translate(dataSource,option);
```

**getKeyName**

_默认获取keyname值_

```
var filename = 'dpts';
var key = '1';
getKeyName(filename,key);
```

**getData**

_获取整个翻译对象_

```
var filename = 'depts';
var key = '1';
getKeyName(filename,key);
```
