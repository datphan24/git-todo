const inputContent = document.querySelector('.add-content .add-input')
const form = document.querySelector('form')
const todos = document.querySelector('.list-todo')
const all = 'all'
const active = 'active'
const completed = 'completed'

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let contentValue = inputContent.value.trim()
    if(contentValue) {
        addTodoElement({
            text: contentValue,
        })
    }
    inputContent.value = ''
})
function addTodoElement(todo) {
    let liTodo = document.createElement('li')
    
    liTodo.innerHTML = `
        <span>${todo.text}</span>
        <input
            type="text"
            value="${todo.text}"
            class="add-input hidden"
        />
        <span>
              <i class="fa fa-times-circle" aria-hidden="true"></i>
        </span>
    `
    
    liTodo.setAttribute('class', 'item-todo general-size')
    //delete a todo use x
    liTodo.querySelector('span:last-child')
        .addEventListener('click', function(e) {
            this.parentElement.remove()
            //delete a todo then update the quantity
            count()
            hiddenFooter()
        })
    // tick todo completed
    let spanTodo = liTodo.querySelector('span:first-child')
    spanTodo.addEventListener('click', function(e) {
        this.classList.toggle('completed')
        //completed a todo then update the quantity
        count()
    })

    // edit todo
    spanTodo.addEventListener('dblclick', function(e) {
        this.classList.add('hidden')
        if (spanTodo.classList.contains('hidden')) {
            let editTodo = liTodo.querySelector('.add-input')
            editTodo.classList.remove('hidden')
            editTodo.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    spanTodo.innerText = editTodo.value.trim()
                    spanTodo.classList.remove('hidden')
                    editTodo.classList.add('hidden')
                }
            })
            editTodo.addEventListener('focusout', (e) => {
                spanTodo.innerText = editTodo.value.trim()
                editTodo.classList.add('hidden')
                spanTodo.classList.remove('hidden')
                
            })
        }  
    })
    
    todos.appendChild(liTodo)
    getActive()
    count()
    deleteCompleted()
    hiddenFooter()
}
function tickAllTodo() {

}
function getActive() {
    let buttonAll = document.getElementById(all)
    let buttonActive = document.getElementById(active)
    let buttonCompleted = document.getElementById(completed)
    let itemTodos = document.querySelectorAll('.item-todo')
    //button all
    buttonAll.addEventListener('click', function() {
        this.classList.add('on')
        buttonActive.classList.remove('on')
        buttonCompleted.classList.remove('on')

        itemTodos.forEach(item => {
            if (item.classList.contains('hidden')) {
                item.classList.remove('hidden')
            }
        })
    })
    //button active
    buttonActive.addEventListener('click', function() {
        this.classList.add('on')
        buttonAll.classList.remove('on')
        buttonCompleted.classList.remove('on')

        itemTodos.forEach(item => {
            if (item.querySelector('span:first-child').classList.contains('completed')) {
                item.classList.add('hidden')
            }else {
                item.classList.remove('hidden')
            }
        })
    })
    //button completed
    buttonCompleted.addEventListener('click', function() {
        this.classList.add('on')
        buttonAll.classList.remove('on')
        buttonActive.classList.remove('on')

        itemTodos.forEach(item => {
            if (item.querySelector('span:first-child').classList.contains('completed')) {
                item.classList.remove('hidden')
            } else {
                item.classList.add('hidden')
            }
        })
        itemTodos.forEach(item => {
            if (item.querySelector('span:first-child').classList.contains('completed')) {
                item.classList.remove('hidden')
            } else {
                item.classList.add('hidden')
            }
        })
    })
}
function count() {
    let listAllSpan = document.querySelectorAll('.item-todo span:first-child')
    let listSpanCompleted = document.querySelectorAll('.item-todo .completed')
    let countNumber = document.querySelector('.number-item')
    let count = listAllSpan.length - listSpanCompleted.length

    countNumber.innerHTML = `${count}`
}
function deleteCompleted() {
    let buttonClearCompleted = document.querySelector('#clear-completed')
    
    buttonClearCompleted.addEventListener('click', function () {
        let listSpanCompleted = document.querySelectorAll('.item-todo .completed')
        listSpanCompleted.forEach(listSpanCompleted => {
            listSpanCompleted.parentElement.remove()
            hiddenFooter() 
        })
    })
}
function hiddenFooter() {
    let itemTodos = document.querySelectorAll('.item-todo')
    let stat = document.querySelector('.stat')
    let footer = document.querySelector('footer')
    
    if (itemTodos.length == 0) {
        stat.classList.add('hidden')
        footer.classList.add('hidden')
    } else {
        stat.classList.remove('hidden')
        footer.classList.remove('hidden')
    }
}