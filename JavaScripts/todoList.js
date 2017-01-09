//todoList has functions to modify a 'todo list'
//like add, display, change, delete, toggle item completion, toggle, all item completion

var featList;

function preload() {
  var featlist = $.getJSON("featList.json");
}

var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,  //this is where todoText is defined for each element in todos[]
      completed: false    //this is where completed is defined for each element in todos[]
    });
  },
  changeTodo: function(index, todoText) {
    this.todos[index].todoText = todoText;
  },
  toggleCompleted: function(index) {
    var todo = this.todos[index];
    todo.completed = !todo.completed;
  },
  deleteTodo: function(index) {
    this.todos.splice(index, 1);
  },
  toggleAll: function() {
    var allTodos = this.todos.length;
    var completedTodos = 0;
    //get completedTodos
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    //Case 1: if all todos are completed (true), make them incomplete (false)
    if (allTodos === completedTodos) {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = false;
      }
      //Case 2: otherwise, make them completed (true)
    } else {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput-demo');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoIndexInput = document.getElementById('changeTodoNumberInput-demo');
    var  changeTodoTextInput = document.getElementById('changeTodoTextInput-demo');
    todoList.changeTodo(changeTodoNumberInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoIndexInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function() {
    var deleteTodoNumberInput = document.getElementById('deleteTodoNumberInput-demo');
    todoList.deleteTodo(deleteTodoNumberInput.valueAsNumber);
    deleteTodoNumberInput.value = '';
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedNumberInput = document.getElementById('toggleCompletedNumberInput-demo');
    todoList.toggleCompleted(toggleCompletedNumberInput.valueAsNumber);
    toggleCompletedNumberInput.value = '';
    view.displayTodos();
  },


  loadFeatList: function() {
    console.log(featList);

    var ul = document.createElement('ul');
    var featLi = document.createElement('li');


    featLi.innerHTML = featList[0].todoText;
    ul.appendChild(featLi);
    document.getElementById('feat-list').appendChild(ul);





  }


};

var view = {
  displayTodos: function() {
    var todosUl = document.getElementById('demo-list');
    todosUl.innerHTML = '';
    for(var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
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
