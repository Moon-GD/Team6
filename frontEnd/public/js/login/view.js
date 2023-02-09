import { eventToLoginBtn } from "./event.js";
import { getLoginTemplate } from "./template.js";

const loginView = () => {
    const $loginContainer = document.createElement("section");
    $loginContainer.classList.add("loginArea");
    $loginContainer.innerHTML = getLoginTemplate();

    eventToLoginBtn($loginContainer);

    return $loginContainer;
}

export { loginView }