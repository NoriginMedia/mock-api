var jsonfile = require("jsonfile");
var moment = require("moment");

var file = "examples/demo/epg.json";

var epgData = jsonfile.readFileSync(file);

var currentDay = moment().format("YYYY-MM-DD");
var alignToCurrentDay = function(time) {
  var timeOffset = moment(time).format("HH:mm");

  return moment(currentDay + " " + timeOffset).valueOf();
};

for (var i = 0; i < epgData.length; i++) {
  var channel = epgData[i];
  var schedules = channel.schedules;

  for (var j = 0; j < schedules.length; j++) {
    var program = schedules[j];

    program.start = alignToCurrentDay(program.start);
    program.end = alignToCurrentDay(program.end);

    epgData[i].schedules[j] = program;
  }
}

jsonfile.writeFileSync(file, epgData, {spaces: 2});