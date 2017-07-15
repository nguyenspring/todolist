var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTask=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasks=document.getElementById("completed-tasks");//completed-tasks


//task list item
var createNewTaskElement=function(taskString){
  // creates row
  var listItem=document.createElement("li");

  //checkbox
  var checkBox=document.createElement("input");
  //label
  var label=document.createElement("label");
  //input 
  var editInput=document.createElement("input");
  //edit button
  var editButton=document.createElement("button");

  //delete button
  var deleteButton=document.createElement("button");

  label.innerText=taskString;

  //elements of task list item
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit";
  editButton.className="edit";
  deleteButton.innerText="Delete";
  deleteButton.className="delete";



  //appends the elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){

  //Create a new list item 
  var listItem=createNewTaskElement(taskInput.value);

  //Append list item to incompleteTask
  incompleteTask.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.
var editTask=function(){

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
      label.innerText=editInput.value;
    }else{
      editInput.value=label.innerText;
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


// Checkmark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
  
  //Append the task list item to the completed tasks
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);

}

// Checkmark task as incomplete
var taskIncomplete=function(){
    console.log("Incomplete Task...");

    //Append the task list item to the incomplete tasks.
    var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
      bindTaskEvents(listItem,taskCompleted);
}


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);




var bindTaskEvents=function(taskListItem,checkBoxEventHandler){

//select ListItems children
  var checkBox=taskListItem.querySelector("input[type=checkbox]");
  var editButton=taskListItem.querySelector("button.edit");
  var deleteButton=taskListItem.querySelector("button.delete");


      //Bind editTask to edit button.
      editButton.onclick=editTask;
      //Bind deleteTask to delete button.
      deleteButton.onclick=deleteTask;
      //Bind taskCompleted to checkBoxEventHandler.
      checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTask ul list items
  //for each list item
  for (var i=0; i<incompleteTask.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTask.children[i],taskCompleted);
  }




//cycle over completedTasks  list items
  for (var i=0; i<completedTasks.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasks.children[i],taskIncomplete);
  }
