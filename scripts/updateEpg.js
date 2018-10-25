var jsonfile = require("jsonfile");
var moment = require("moment");

var file = "examples/demo/epg.json";

// Todo remove this - Quick fix to allow resolving of module path when run from parent project
if (__dirname.indexOf("node_modules") > -1) {
    file = "node_modules/nm-mock-api/" + file;
}

var epgData = jsonfile.readFileSync(file);
var channels = epgData.channels;

var currentDay = moment(moment().format("YYYY-MM-DD")).valueOf();
var nextDay = moment(moment().add(1, "day").format("YYYY-MM-DD")).valueOf();

var addRandomInterval = function (time) {
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

for (var i = 0; i < channels.length; i++) {
    var schedules = [];

    var startTime = currentDay;
    var endTime = addRandomInterval(startTime);

    while (endTime < nextDay) {
        var program = {};
        program.title = programsRotation[Math.floor(Math.random() * (programsRotation.length))];

        program.id = 'dummy_program_id';
        program.start = moment(startTime).format();
        program.end = moment(endTime).format();

        schedules.push(program);

        startTime = endTime;
        endTime = addRandomInterval(endTime);
    }

    channels[i].schedules = schedules;
}


epgData.channels = channels;
jsonfile.writeFileSync(file, epgData, {spaces: 2});
