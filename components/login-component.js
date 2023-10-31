export function renderLoginComponent({ appElement, setToken, fetchTodosAndRender}) {
    const appTemplate = `<div class="form">
    <h3 class="form-title">Форма авторизации</h3>
    <div class="form-row">
        Логин:
        <input type="text" id="login-input" class="input" placeholder="Введите логин"/>
        <br />
        <br />
        Пароль:
        <input type="text" id="login-input" class="input" placeholder="Введите пароль"/>
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
</div>`;
        appElement.innerHTML = appTemplate;
        document.getElementById("login-button").addEventListener("click", () => {
            setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
            fetchTodosAndRender();
        })
}