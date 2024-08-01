const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let result = new Rover(3);

    expect(result.position).toBe(3);
    expect(result.mode).toBe("NORMAL");
    expect(result.generatorWatts).toBe(110);
  });


  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let mess = new Message('Test message with two commands', commands);
    let rover = new Rover(3);
    let result = rover.receiveMessage(mess); 
    
    expect(result.message).toBe('Test message with two commands');
  });


  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let mess = new Message('Test message with two commands', commands);
    let rover = new Rover(3);
    let result = rover.receiveMessage(mess); 
    
    expect(result.results.length).toBe(2);
  });


  it("responds correctly to the status check command", function() {
    let commands = [ new Command('STATUS_CHECK')];
    let mess = new Message('Test message with one command', commands);
    let rover = new Rover(3);
    let check = rover.receiveMessage(mess);
    let result = check.results; 
    
    
    expect(result[0].completed).toBe(true);
    expect(result[0].roverStatus.mode).toBe('NORMAL');
    expect(result[0].roverStatus.generatorWatts).toBe(110);
    expect(result[0].roverStatus.position).toBe(3);
  });


  it("responds correctly to the mode change command", function() {
    let commands = [ new Command('MODE_CHANGE', 'LOW_POWER')];
    let mess = new Message('Test message with one command', commands);
    let rover = new Rover(3);
    let check = rover.receiveMessage(mess);
    let result = check.results; 
    
    
    expect(result[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });


  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',5)];
    let mess = new Message('Test message with two commands', commands);
    let rover = new Rover(3);
    let check = rover.receiveMessage(mess);
    let result = check.results; 
    
    
    expect(rover.mode).toBe('LOW_POWER');
    expect(rover.position).toBe(3);
    expect(result[0].completed).toBe(true);
    expect(result[1].completed).toBe(false);
  });


  it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE',5)];
    let mess = new Message('Test message with two commands', commands);
    let rover = new Rover(3);
    let check = rover.receiveMessage(mess);
    let result = check.results; 
    
    
    expect(rover.mode).toBe('NORMAL');
    expect(rover.position).toBe(5);
    expect(result[0].completed).toBe(true);
  });

});
