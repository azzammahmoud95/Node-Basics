
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text ==='exit\n') {
    quit();
  }
  else if (text === 'hello'||text.startsWith('hello')) {
    hello(text);}
    else if(text === 'help\n'){
      help();
    }
    else if(text === 'list\n'){
      list();
    }
    else if(text.startsWith('add ')){
      add(text);
    }else if(text === "add\n"){
      console.log("Error: Your format sould be like [add Item]")
    }
    else if(text.trim().split(" ")[0]==='remove'){
      remove(text);
    }
    else if(text.trim().split(" ")[0]==='edit'){
      edit(text);
    }
  else{
    unknownCommand(text);
  }
}

let list2 = ["Item1","Item2","Item3"]

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 * If you write hello x, it should be hello x!, hello return hello!
 * @returns {void}
 */
function hello(text){
  console.log(text.trim()+'!')
}

/**
 * 
 * list
 * @returns {void}
 * 
 */
function list(){

 for(let i=0;i< list2.length;i++){
  console.log(`${i+1}-${list2[i]}`)
 }
}
/**
 * 
 * Add Command
 * @returns {void}
 * 
 */
function add(text){
  let newItem = text.substr(4,text.length)
  list2.push(newItem)
}
/**
 * 
 * Remove Command
 * @returns {void}
 * 
 */

 function remove(text) {
  if (text.trim().split(" ")[1]) {
      var n = text.trim().split(" ")[1];
      var b = list2.length;
      for (let i = 0; i < list2.length; i++) {
          if (i == n - 1) {
              list2.splice(i, 1);
              console.log(`task ${n} removed`);
          }
      }
      if (b === list2.length) {
          console.log(`task ${n} does not exist`);
      }
  } else {
      list2.pop();
      console.log("last task removed");
  }
}
/**
 * 
 * Edit Command
 * @returns {void}
 * 
 */
 function edit(text) {
  var task = text.trim().split(" ");
  task.shift();
  if (isNaN(Number(task[0]))) {
      task = task.join(" ");
      if (list2.trim()) {
        list2[list2.length - 1] = task;
          console.log(`task edited to ${task}`);
          list();
      } else {
          console.log("Please edit an existing task");
      }
  } else {
      let n = Number(task[0]);
      task.shift();
      task = task.join(" ");
      if (task.trim()) {
          if (n <= list2.length) {
            list2[n - 1] = task;
              console.log(`task ${n} is edited to ${task}`);
              list();
          } else {
              console.log("number of task does not exist");
          }
      } else {
          console.log("Please edit an existing task");
      }
  }
}
/*
* Help 
* function that is supposed to return list of all the possible commands
* 
 */


function help(){

  console.log('1-quit\n2-exit\n3-hello\n4-list\n5-add\n6-remove\n')
}
/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Azzam Mahmoud")
