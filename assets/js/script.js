document.addEventListener('DOMContentLoaded', (event) => {
  let nextTaskId = 61; // Comenzar ID de tareas después del último ID de las tareas iniciales

  const initialTasks = [
    { id: 17, content: 'Hacer mercado', completed: false },
    { id: 60, content: 'Estudiar para la prueba', completed: false },
    { id: 24, content: 'Sacar a pasear a Toby', completed: false }
  ];

  // Con esta función llamamos clases del DOM
  function updateCounters() {
    const totalCount = document.getElementById('total-count');
    const completedCount = document.getElementById('completed-count');  
    const totalTasks = document.querySelectorAll('#task-list tr').length;
    const completedTasks = document.querySelectorAll('#task-list .completed').length;
    totalCount.textContent = totalTasks;
    completedCount.textContent = completedTasks;
  }

  function addTask(taskId, taskContent, isCompleted) {
    const taskList = document.getElementById('task-list');
    const row = taskList.insertRow();
    const cellId = row.insertCell(0);
    const cellContent = row.insertCell(1);
    const cellActions = row.insertCell(2);

    cellId.textContent = taskId;
    cellContent.textContent = taskContent;
    if (isCompleted) {
      cellContent.classList.add('completed');
    }
    cellActions.innerHTML = `
      <button class="btn btn-primary btn-sm complete-btn">✓</button>
      <button class="btn btn-danger btn-sm delete-btn">✕</button>
    `;

    cellActions.getElementsByClassName('complete-btn')[0].onclick = function() {
      cellContent.classList.toggle('completed');
      updateCounters();
    };

    cellActions.getElementsByClassName('delete-btn')[0].onclick = function() {
      taskList.deleteRow(row.rowIndex - 1);
      updateCounters();
    };

    updateCounters();
  }

  // Iterar sobre el arreglo de tareas iniciales y agregarlas a la página
  for (const task of initialTasks) {
    addTask(task.id, task.content, task.completed);
  }

  // Asegurarse de que el siguiente ID sea mayor que cualquier ID de las tareas iniciales
  nextTaskId = Math.max(...initialTasks.map(t => t.id)) + 1;

  document.getElementById('add-task-btn').onclick = function() {
    const taskInput = document.getElementById('new-task-input');
    if (taskInput.value.trim() !== '') {
      addTask(nextTaskId++, taskInput.value.trim(), false);
      taskInput.value = ''; // Limpiar el campo de texto
      updateCounters();
    }
  };

  // Actualizar contadores al inicio
  updateCounters();
});
