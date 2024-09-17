$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
       
        if (username === "admin" && password === "12345") {
            
            window.location.href = "home.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});

// new
$(document).ready(function() {
    
    $('#logout').click(function(event) {
        event.preventDefault();
        
        window.location.href = "index.html";
    });
});


$(document).ready(function() {
    
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
           
            displayTodoList(data);
        })
        .catch(error => console.error('Error fetching todo list:', error));

    
    function displayTodoList(todoList) {
        var todoListContent = $('#todoListContent');
        todoListContent.empty(); 
        var initiallyCompletedCount = 0;

        todoList.forEach(todo => {
            var listItem = $('<li>').addClass('list-group-item');
            var todoItem = $('<div class="todo-item"></div>');
            var checkbox = $('<input>').attr({
                type: 'checkbox',
                class: 'todo-checkbox',
                id: 'todo' + todo.id
            });
            var label = $('<label>').attr('for', 'todo' + todo.id).text(todo.title);
            todoItem.append(checkbox).append(label);

            if (todo.completed) {
                listItem.addClass('completed');
                checkbox.prop('checked', true);
                initiallyCompletedCount++;
            }

            listItem.append(todoItem);
            listItem.appendTo(todoListContent);
        });

       
        var checkedCount = initiallyCompletedCount;
        var uncheckedToCheckedCount = 0;
        $('#todoListContent').on('change', '.todo-checkbox', function() {
            if ($(this).prop('checked')) {
                checkedCount++;
                if (!$(this).closest('li').hasClass('completed')) {
                    uncheckedToCheckedCount++;
                }
            } else {
                checkedCount--;
                if ($(this).closest('li').hasClass('completed')) {
                    uncheckedToCheckedCount--;
                }
            }

            if (uncheckedToCheckedCount === 5) {
                alert("Congrats. 5 Tasks have been Successfully Completed");
            }
        });
    }
});