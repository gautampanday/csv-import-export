var csv = require('csv-parser');
var fs = require("fs");
var json2csv = require('json2csv');

var createAllInsertData = [];
var createAllInsert;


fs.createReadStream('test.csv')
.pipe(csv())
.on('data', function (data) {
    var newUrl = 'http://yoururl.com?key_One_CSV_Value='+data.key_One_CSV_Value+'&&key_Two_CSV_Value='+data.key_Two_CSV_Value;
    createAllInsert = ({  "randomUrl" : newUrl });
   createAllInsertData.push(createAllInsert);
})
.on('end', function () {
  var fields = ['randomUrl'];
 
try {
  var result = json2csv({ data: createAllInsertData, fields: fields });
  console.log(result);
  fs.writeFile('randomUrl.csv', result, function(err) {
  if (err) throw err;
  console.log('file saved');
});
} catch (err) {
  // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
  // Be sure to provide fields if it is possible that your data array will be empty. 
  console.error(err);
}
})