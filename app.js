var ev3 = require('ev3-nodejs-bt');
var Ev3_base = ev3.base;

var robot = new Ev3_base("/dev/tty.EV3-SerialPort");

var motor_on_focus = "a";
var motor_output = {"a": 0, "b":0,"c":0, "d":0};

var example_program = function(target) {
  var stdin = process.openStdin();
  var stdin = process.stdin;
  stdin.setRawMode( true );
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', function( key ){
    process_input(key,target);
  });
};

var process_input = function(key,target) {
  if ( key === '\u0003' ) {
    target.disconnect();
    process.exit();
  } else if( key == "a" || key == "b" || key == "c" || key == "d"){
    motor_on_focus = key;
  } else if(key === '\u001b[A'){ //upper arrow sequence
    if( motor_output[motor_on_focus] < 100){
        motor_output[motor_on_focus]+=1;
    }
  } else if (key === '\u001b[B') {
    if( motor_output[motor_on_focus] >- 100){
      motor_output[motor_on_focus]-=1;
    }
  }

  var output = target.getOutputSequence(motor_output["a"],motor_output["b"],motor_output["c"],motor_output["d"]);
  target.sp.write(output,function(){});
  process.stdout.write( motor_on_focus + " motor output:" + motor_output[motor_on_focus] +"\n");
};

robot.connect(function(){
    robot.start_program(example_program);
});
