import { addEvent, changeCSS, giveErrorStyle } from "../common/function";
import { fetchLoginID } from "./fetch";

const eventToLoginBtn = ($container) => {
    const $loginBtn = $container.querySelector("#loginArea__loginBtn");
    const $IDInput = $container.querySelector(".loginArea__IDInput");
    const $PWInput = $container.querySelector(".loginArea__PWInput");

    addEvent($loginBtn, [() => {
        if($IDInput.value === "") {
            giveErrorStyle($IDInput, "outline", "0.4vh solid #14BD7E", "0.4vh solid red", 1000);

            return;
        }

        if($PWInput.value === "") {
            giveErrorStyle($PWInput, "outline", "#0.4vh solid #14BD7E", "0.4vh solid red", 1000);

            return;
        }

        fetchLoginID($IDInput, $PWInput)
    }]);
}

export { eventToLoginBtn }