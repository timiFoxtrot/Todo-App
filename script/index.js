function main() {
    window.addEventListener('load', () => {
        todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newTodoForm = document.querySelector('.add-input');

        newTodoForm.addEventListener('submit', (e) => {
            e.preventDefault()

            if (e.target.elements.content.value.length == 0){
                alert('Please enter a task');
                return;
            }

            const todoObject = {
                content: e.target.elements.content.value, 
                date: new Date().toDateString(), 
                time: new Date().toLocaleTimeString()
            }

            todos.unshift(todoObject);

            localStorage.setItem('todos', JSON.stringify(todos));

            e.target.reset()
            displayTodos()
        })
        displayTodos()
    })

    function displayTodos () {
        const tasks_containers = document.querySelector('#tasks')
        tasks_containers.innerHTML = '';

        todos.forEach(todo => {
            const task_container = document.createElement('div');
            task_container.classList.add('task', 'parent');

            const content = document.createElement('div');
            content.classList.add('todo-content');

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const edit = document.createElement('button');
            edit.classList.add('edit');

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete');

            content.innerHTML = 
            `<div><input type="text" id="inpu" class="input" value="${todo.content}" readonly></div>
            <div><input type="text" value="${todo.date}, ${todo.time}" readonly></div>`;
            
            edit.innerHTML = 'Edit';
            deleteBtn.innerHTML = 'Delete';

            actions.appendChild(edit);
            actions.appendChild(deleteBtn);
            task_container.appendChild(content);
            task_container.appendChild(actions);

            tasks_containers.appendChild(task_container);

            edit.addEventListener('click', (e) => {
                const input = content.querySelector('.input');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', (e) => {
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    displayTodos();
                })
            })

            deleteBtn.addEventListener('click', () => {
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos()
            })
        })

        let search = document.querySelector('.search');
        function searchTodo (e) {
            const text = e.target.value.toLowerCase();
            let items = document.querySelectorAll('.parent');
            items = [...items]
            for (let item of items) {
                console.log(item);
                let task = item.firstElementChild.firstElementChild.firstElementChild.value

                if(task.toLowerCase().indexOf(text) != -1) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none'
                }

            }
        }

        search.addEventListener('keyup', searchTodo)
    }
}
main()



module.exports = { main }
