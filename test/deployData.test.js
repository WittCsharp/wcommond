'use strict';

const expect = require('chai').expect;

const deployData = require('../src/deployData');

describe('测试翻译类',() => {
  it('测试getKeyName',() => {
    var filename = 'whoantibiotic';
    var key = 'FCT';
    expect(deployData.getKeyName(filename,key)).to.be.equal('5-氟胞嘧啶');
  });

  it('测试getData',() => {
    var filename = 'whoantibiotic';
    var key = 'FCT';
    expect(deployData.getData(filename,key)).to.be.deep.equal({
      code: "FCT",
      engName: "5-Fluorocytosine",
      cnName: "5-氟胞嘧啶",
      keyname:"5-氟胞嘧啶"
    });
  });

  it('测试translate',() => {
    var dataSource = {
      code:'FCT',
      time:'2015-04-01'
    };
    var result = {
      code:'FCT',
      antibioticName:'5-Fluorocytosine',
      time:'2015-04-01'
    };
    var option = [
      'code|whoantibiotic|engName|antibioticName'
    ];
    expect(deployData.translate(dataSource,option)).to.be.deep.equal(result);
  });

  it('测试translate',() => {
    var dataSource = [{
      code:'FCT',
      time:'2015-04-01'
    },
    {
      code:'ACM',
      time:'2015-05-01'
    }
  ];
    var result = [{
      code:'FCT',
      antibioticName:'5-Fluorocytosine',
      time:'2015-04-01'
    },
    {
      code:'ACM',
      time:'2015-05-01',
      antibioticName:'Acetylmidecamycin'
    }
  ];
    var option = [
      'code|whoantibiotic|engName|antibioticName'
    ];
    expect(deployData.translate(dataSource,option)).to.be.deep.equal(result);
  });

});
