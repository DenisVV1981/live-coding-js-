import { loginUser } from "../api.js";

export function renderLoginComponent({ appElement, setToken, fetchTodosAndRender }) {
    const appTemplate = `<div class="form">
    <h3 class="form-title">Форма авторизации</h3>
    <div class="form-row">
        Логин:
        <input type="text" id="login-input" class="input" placeholder="Введите логин"/>
        <br />
        <br />
        Пароль:
        <input type="text" id="password-input" class="input" placeholder="Введите пароль"/>
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
</div>`;
    appElement.innerHTML = appTemplate;
    document.getElementById("login-button").addEventListener("click", () => {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;
        if (!login) {
            alert("Введите логин...")
            return;
        }
        if (!password) {
            alert("Введите пароль...")
            return;
        }
        loginUser({
            login: login,
            password: password,
        }
        ).then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchTodosAndRender();
        }).catch((error) => {
            alert("Неверный логин или пароль");
        })

    })
}