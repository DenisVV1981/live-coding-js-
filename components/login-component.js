import { loginUser, registrUser } from "../api.js";

export function renderLoginComponent({ appElement, setToken, fetchTodosAndRender }) {
    let isLoginMode = true;

    const renderForm = () => {
        const appTemplate = `<div class="form">
    <h1>Список задач</h1>
    <h3 class="form-title">Форма ${isLoginMode ? 'авторизации' : 'регистрации'} </h3>
    <div class="form-row">
    ${isLoginMode ? '' :
                `Имя:
        <input type="text" id="name-input" class="input" placeholder="Введите логин"/>
        <br />`}
        <br />
        Логин:
        <input type="text" id="login-input" class="input" placeholder="Введите логин"/>
        <br />
        <br />
        Пароль:
        <input type="password" id="password-input" class="input" placeholder="Введите пароль"/>
    </div>
    <br />
    <button class="button" id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
    <br />
    <br />
    <button class="button" id="toggle-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
</div>`;
        appElement.innerHTML = appTemplate;
        document.getElementById("login-button").addEventListener("click", () => {
            if (isLoginMode) {
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
                    alert(error.message);;
                })
            } else {
                const name = document.getElementById("name-input").value;
                const login = document.getElementById("login-input").value;
                const password = document.getElementById("password-input").value;
                if (!name) {
                    alert("Введите имя...")
                    return;
                }
                if (!login) {
                    alert("Введите логин...")
                    return;
                }
                if (!password) {
                    alert("Введите пароль...")
                    return;
                }
                registrUser({
                    login: login,
                    password: password,
                    name: name,
                }
                ).then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    fetchTodosAndRender();
                }).catch((error) => {
                    alert(error.message);
                })
            }


        });
        document.getElementById("toggle-button").addEventListener("click", () => {
            isLoginMode = !isLoginMode;
            renderForm();
        });
    };
    renderForm();
}
