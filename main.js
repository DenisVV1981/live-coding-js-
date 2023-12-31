import { addTodo, getTodos, deleteTodo } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";

let tasks = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

const fetchTodosAndRender = () => {
    return getTodos({ token })
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
};

const renderApp = () => {
    const appElement = document.getElementById("app");
    if (!token) {
        renderLoginComponent({
            appElement,
            fetchTodosAndRender,
            setToken: (newToken) => {
                token = newToken;
            }
        });
        return;
    }

    const tasksHtml = tasks
        .map((task) => {
            return `
      <li class="task">
        <p class="task-text">
          ${task.text} (Создал: ${task.user?.name ?? "Неизвестно"})
          <button data-id="${task.id}" class="button delete-button">Удалить</button>
        </p>
      </li>`;
        })
        .join("");

    const appTemplate = `<h1>Список задач</h1>
<ul class="tasks" id="list">
    ${tasksHtml} 
</ul>
<br />
<div class="form">
    <h3 class="form-title">Форма добавления</h3>
    <div class="form-row">
        Что нужно сделать:
        <input type="text" id="text-input" class="input" placeholder="Выпить кофе" />
    </div>
    <br />
    <button class="button" id="add-button">Добавить</button>
</div>`;
    appElement.innerHTML = appTemplate;

    const buttonElement = document.getElementById("add-button");
    const textInputElement = document.getElementById("text-input");

    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляется...";
        addTodo({
            token,
            text: textInputElement.value,
        })
            .then(() => {
                textInputElement.value = "";
            })
            .then(() => {
                return fetchTodosAndRender();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
                console.error(error);
                alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            });

        renderApp();
    });

    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            deleteTodo({ id, token })
                .then((responseData) => {
                    tasks = responseData.todos;
                    renderApp();
                });

            renderApp();
        });
    }
};
renderApp();