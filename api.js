const host = "https://wedev-api.sky.pro/api/v2/todos";

export function getTodos({ token}) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            if (response.status === 401) {
                token = prompt("Введите верный токен...");
                fetchTodosAndRender();
                throw new Error("нет авторизации");
            }
            return response.json();
        })
}

export function addTodo({ token, text }) {
     return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            return response.json();
        })
}

export function deleteTodo({ id, token }) {
    return fetch("https://wedev-api.sky.pro/api/v2/todos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            return response.json();
        })
}