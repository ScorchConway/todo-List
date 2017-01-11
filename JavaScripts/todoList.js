//todoList has functions to modify a 'todo list'
//like add, display, change, delete, toggle item completion, toggle, all item completion

var todoList = {
  todos: [],
  featListTodos: [],
  addTodo: function(todoText, list) {
    var listToAddTo;
    if(list === 'todos') {
      listToAddTo = this.todos;
    } else {
      listToAddTo = this.featListTodos;
    }
    listToAddTo.push({
      todoText: todoText,  //this is where todoText is defined for each element in todos[]
      completed: false    //this is where completed is defined for each element in todos[]
    });
  },
  changeTodo: function(index, todoText, list) {
    var listToChange;
    if (list === 'todos') {
      listToChange = this.todos;
    } else {
      listToChange = this.featListTodos;
    }
    listToChange[index].todoText = todoText;
  },
  toggleCompleted: function(index, list) {
    var listToToggle;
    if (list === 'todos') {
      listToToggle = this.todos;
    } else {
      listToToggle = this.featListTodos;
    }
    var todo = listToToggle[index];
    todo.completed = !todo.completed;
  },
  deleteTodo: function(index, list) {
    var listToDeleteFrom;
    if (list === 'todos') {
      listToDeleteFrom = this.todos;
    } else {
      listToDeleteFrom = this.featListTodos;
    }
    listToDeleteFrom.splice(index, 1);
  },
  toggleAll: function(list) {
    var listToToggle;
    if (list === 'todos') {
      listToToggle = this.todos;
    } else {
      listToToggle = this.featListTodos;
    }
    var allTodos = listToToggle.length;
    var completedTodos = 0;
    //get completedTodos
    for (var i = 0; i < allTodos; i++) {
      if (listToToggle[i].completed === true) {
        completedTodos++;
      }
    }
    //Case 1: if all todos are completed (true), make them incomplete (false)
    if (allTodos === completedTodos) {
      for (var i = 0; i < listToToggle.length; i++) {
        listToToggle[i].completed = false;
      }
      //Case 2: otherwise, make them completed (true)
    } else {
      for (var i = 0; i < listToToggle.length; i++) {
        listToToggle[i].completed = true;
      }
    }
  }
};

var handlers = {
  toggleAll: function(list) {
    var listToToggle;
    if (list === 'todos') {
      listToToggle = todoList.todos;
    } else {
      listToToggle = todoList.featListTodos;
    }
    todoList.toggleAll(list);
    view.displayTodos(list.valueOf());
  },
  addTodo: function(list) {
    var addTodoTextInput;
    if(list === 'todos') {
      console.log(String(list));
      addTodoTextInput = document.getElementById('addTodoTextInput-demo');
      todoList.addTodo(addTodoTextInput.value, String(list));
    } else {
      console.log('addTodo if statement, featList');
      addTodoTextInput = document.getElementById('addTodoTextInput-feat-list');
      todoList.addTodo(addTodoTextInput.value, String(list));
    }
    addTodoTextInput.value = '';
    view.displayTodos(String(list));
  },
  changeTodo: function(list) {
    var listToChange;
    var changeTodoIndexInput
    var changeTodoTextInput
    if (list === 'todos') {
      listToChange = todoList.todos;
      changeTodoIndexInput = document.getElementById('changeTodoNumberInput-demo');
      changeTodoTextInput = document.getElementById('changeTodoTextInput-demo');
    } else {
      listToChange = todoList.featListTodos;
      changeTodoIndexInput = document.getElementById('changeTodoNumberInput-feat-list');
      changeTodoTextInput = document.getElementById('changeTodoTextInput-feat-list');
    }
    todoList.changeTodo(changeTodoIndexInput.valueAsNumber, changeTodoTextInput.value, list);
    changeTodoIndexInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos(list);
  },
  deleteTodo: function(list) {
    var deleteTodoNumberInput;
    if (list === 'todos') {
      deleteTodoNumberInput = document.getElementById('deleteTodoNumberInput-demo');
    } else {
      deleteTodoNumberInput = document.getElementById('deleteTodoNumberInput-feat-list');
    }
    todoList.deleteTodo(deleteTodoNumberInput.valueAsNumber, list);
    deleteTodoNumberInput.value = '';
    view.displayTodos(list);
  },
  toggleCompleted: function(list) {
    var listToToggle;
    var toggleCompletedNumberInput;
    if (list === 'todos') {
      listToToggle = todoList.todos;
      toggleCompletedNumberInput = document.getElementById('toggleCompletedNumberInput-demo');
    } else {
      listToToggle = todoList.featListTodos;
      toggleCompletedNumberInput = document.getElementById('toggleCompletedNumberInput-feat-list');
    }
    todoList.toggleCompleted(toggleCompletedNumberInput.valueAsNumber, list);
    toggleCompletedNumberInput.value = '';
    view.displayTodos(list);
  },
  loadFeatList: function() {
    var featList = [
      {
        todoText: "display additional todo list",
        completed: true
      },{
        todoText: "put placeholder attribute 'add todo' in text field",
        completed: false
      },

      {
        todoText: "load data from json file to display in list (currently stored in js)",
        completed: false
      },

      {
        todoText: "hover over text to see date added, date edited(optional), date completed(optional)",
        completed: false
      },

      {
        todoText: "add save button, prompt for a password",
        completed: false
      },

      {
        todoText: "hit enter to add, change, delete, or toggle",
        completed: false
      },

      {
        todoText: "change to ordered list, change change todo and toggle completed to begin with one (not zero)",
        completed: false
      }
    ];

    //---some code related to loading a json file---
    //var featListFromJSON;
    //$.getJSON("featList.json", function(data) {
    //  featListFromJSON = data;
    //});

    console.log(featList.length);
    for (i = 0; i < featList.length; i++) {
      todoList.featListTodos.push({
        todoText: featList[i].todoText,
        completed: featList[i].completed
      });
    }
    view.displayTodos('featListTodos');
  }
};

var view = {
  displayTodos: function(list) {
    console.log(list);
    var todosUL;
    var listToDisplay;
    if (list === "todos") {
      listToDisplay = todoList.todos;
      todosUl = document.getElementById('demo-list');
      todosUl.innerHTML = '';
    } else {
      console.log('displayTodos() else statement');
      listToDisplay = todoList.featListTodos;
      todosUl = document.getElementById('feat-list');
      todosUl.innerHTML = '';
    }
    for(var i = 0; i < listToDisplay.length; i++) {
      var todoLi = document.createElement('li');
      var todo = listToDisplay[i];
      var todoTextWithCompletion = '';

      if(todo.completed === true) {
        todoTextWithCompletion = ('(x) ' + todo.todoText);
      } else {
        todoTextWithCompletion = ('( ) ' + todo.todoText);
      }

      todoLi.textContent = todoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
};
