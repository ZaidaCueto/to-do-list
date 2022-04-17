const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro',  'novembro', 'dezembro' ];

const lang = navigator.language;
const d = new Date();
let month = months[d.getMonth()];
let daynumber = d.getDate();
let dayname = d.toLocaleString(lang,{weekday:'long'});
document.querySelector('.month').innerHTML = month;
document.querySelector('.date').innerHTML = dayname + ', ' + daynumber +' de ' ;

const taskinput = document.querySelector('.task-input');
const taskaddbtn = document.querySelector('.add-task-btn');
let filter = document.querySelectorAll('.tasks-menu-container span');
const checkbox = document.querySelector('.checkbox');
const todos = JSON.parse(localStorage.getItem("todo-list")||"[]"); 
let updateId ;
let isUpdate = false;

filter.forEach(btn => {
    btn.addEventListener("click",() => {
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showTodos(btn.id);
    })
})


function showTodos(filter) {
    document.querySelectorAll(".task-list").forEach(todo => 
        todo.remove());

   let liTag = '';
   todos.forEach((todo,id)=>{
       let isCompleted = todo.status =='completed'? 'checked':'';
       if(filter == todo.status || filter == 'all'){
           liTag += `<div class="task-list" >
           <label for="${id}">
           <input onclick="taskcomplete(this)"
           type="checkbox" id="${id}" class="checkbox" onclick="taskcomplete(this)" ${isCompleted}><h3 class="task ${isCompleted}">${todo.name }</h3>
           </label>

           <i onclick="showMenu(this)" class='fa-ellipsis bx bx-dots-vertical-rounded '></i>
           <div class="menu">
           <span onclick="editTask(${id},'${todo.name}')" class="edit-btn"><i class='bx bx-edit-alt' ></i>Editar</span>

           <span onclick="deleteTask(${id})" class="delete-btn"><i class='bx bxs-trash' ></i> Deletar</span>
           </div>
        </div>`;
       }
   });
   document.querySelector('.task-list-container').innerHTML = liTag || `
   <span><i class='bx bx-clipboard' ></i> </span>
   <span class="no-task-message"> Não há tarefas aqui</span>`;
}

showTodos('all');


taskaddbtn.addEventListener('click', e =>{
    if(taskinput.value != ''){
        var divlist = document.querySelectorAll('.task-list').length;
        document.querySelector('.number-of-tasks').innerHTML= divlist + 'tasks';
        let userTask =  taskinput.value;
        if(!isUpdate){
            let taskinfo = { name:userTask,status:'pending'};
            todos.push(taskinfo);
        }else{
            isUpdate = false;
            todos[updateId].name = userTask;

        }
        localStorage.setItem('todo-list',JSON.stringify(todos));
        taskinput.value ='';
        showTodos('all');
    }

    var divlist = document.querySelectorAll('.task-list').length;
    document.querySelector('.number-of-tasks').innerHTML = divlist + ' tarefas';
});

function taskcomplete(elem){
    if(elem.checked){
        elem.nextElementSibling.classList.add('checked');
        todos[elem.id].status ='completed';

    }else{
        elem.nextElementSibling.classList.remove('checked');
        todos[elem.id].status = 'pending';


    }

    localStorage.setItem("todo-list",JSON.stringify(todos));


}


function showMenu(selectelem){
    selectelem.parentElement.lastElementChild.classList.add('show');

    document.addEventListener('click',e=>{
        if(e.target.tagName != 'I' || e.target != selectelem ){
            selectelem.parentElement.lastElementChild.classList.remove('show');
        }
    })
}

function deleteTask(deleteId){
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodos('all');

    var divlist = document.querySelectorAll('.task-list').length;
    document.querySelector('.number-of-tasks').innerHTML = divlist +' tarefas';

}

function editTask(taskId, taskName, taskName){
    isUpdate = true;
    updateId = taskId;
    taskinput.focus();

}

document.querySelector('.clear-all-btn').addEventListener('click', ()=>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodos('all');
    var divlist = document.querySelectorAll('.task-list').length;
    document.querySelector('.number-of-tasks').innerHTML = divlist + ' tarefas'
});

var divlist = document.querySelectorAll('.task-list ').length;
document.querySelector('.number-of-tasks').innerHTML = divlist + ' tarefas';