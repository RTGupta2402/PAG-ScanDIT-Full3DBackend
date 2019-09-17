require("./config.test");
var expect = require("chai").expect;

describe('validate search by SAP Material Number API api', function () {    

    it('Validate invalid request- BAD request code (400) return when request is incorrect', async function () {
       var params = {search: "1"};
       var  result =  await Parse.Cloud.run('searchMaterialNumber', params);    
        expect(result.statuscode).to.equal(400);        
    })

    it('When Sap Number exists in collection it should return 200 statuscode', async function () {
        var params = {searchSap: "1053398328"};
        var result = await Parse.Cloud.run('searchMaterialNumber', params);    
        expect(result.statuscode).to.equal(200);        
     })
}) 

describe('validate search by HTZ Number API api', function () {    

    it('Validate invalid request- BAD request code (400) return when request is incorrect', async function () {
       var params = {search: "1"};
       var  result =  await Parse.Cloud.run('searchHtzNumber', params);    
        expect(result.statuscode).to.equal(400);        
    })

    it('When htz number exists it should return 200 statuscode', async function () {
        var params = {searchHtz: "v"};
        var result = await Parse.Cloud.run('searchHtzNumber', params);    
        expect(result.statuscode).to.equal(200);        
     })
}) 
