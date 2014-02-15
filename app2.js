var ev3 = require('ev3-nodejs-bt');
var Ev3_base = ev3.base;

var robot = new Ev3_base("/dev/tty.EV3-SerialPort");

var motor_on_focus = "a";
var motor_output = {"a": 0, "b":0,"c":0, "d":0};

var example_program = function(target) {
};

robot.connect(function(){
    robot.start_program(example_program);
});
