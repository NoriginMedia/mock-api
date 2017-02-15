var jsonfile = require("jsonfile");
var moment = require("moment");

var file = "examples/demo/epg.json";

var epgData = jsonfile.readFileSync(file);

var currentDay = moment(moment().format("YYYY-MM-DD")).valueOf();
var nextDay = moment(moment().add(1, "day").format("YYYY-MM-DD")).valueOf();

var addRandomInterval = function(time) {
  return moment(time).add((Math.floor((Math.random() * 4) + 2)) * 10, 'minutes').valueOf();
};

var programsRotation = [
  'Supernatural',
  'Awesome Program',
  'Game of Thrones',
  'Cool Stuff',
  'Vikings',
  'Interesting Show'
];

for (var i = 0; i < epgData.length; i++) {
  var schedules = [];

  var startTime = currentDay;
  var endTime = addRandomInterval(startTime);

  while(endTime < nextDay) {
    var program = {};
    program.title = programsRotation[Math.floor(Math.random() * (programsRotation.length))];

    program.id = 'dummy_program_id';
    program.start = startTime;
    program.end = endTime;

    schedules.push(program);

    startTime = endTime;
    endTime = addRandomInterval(endTime);
  }

  epgData[i].schedules = schedules;
}

jsonfile.writeFileSync(file, epgData, {spaces: 2});