import { addEvent, makeLighter, pipe } from "../common/function.js";
import { deleteChatNode, getChatTextArray } from "./helperFunction.js";
import { chatBotAnswerView__myPage01, chatBotAnswerView__myPage02, chatBotManagerView, chatBotView } from "./view.js";

let chatBotArea = "";

const eventToChatBotCloseBtn = ($chatBotCloseBtn) => addEvent($chatBotCloseBtn, 
    [() => $chatBotCloseBtn.closest(".chatBotArea").remove()])

const eventToChatBot = ($chatBotImg) => {
    $chatBotImg.addEventListener("click", () => {
        const $chatBotView = chatBotView();
        $chatBotImg.after($chatBotView);
        eventToChatBotText($chatBotView);

        const $chatBotCloseBtn = $chatBotView.querySelector(".chatBotArea__closeBtn");
        eventToChatBotCloseBtn($chatBotCloseBtn);
    })
}

const eventToChatBotText = ($chatBotContent) => pipe(
    () => getChatTextArray($chatBotContent),
    ([$saveChat, $searchChat, $clientChat]) => {
        eventToSaveChat($saveChat);
        eventToSearchChat($searchChat);
        eventToClientChat($clientChat);
    }
)();

const eventToSaveChat = ($saveChat) => addEvent($saveChat, [
    () => deleteChatNode(),
    () => chatBotArea = document.querySelector(".chatBotArea__background"),
    () => {
        const $answerText01 = chatBotAnswerView__myPage01();
        const $answerText02 = chatBotAnswerView__myPage02();
        const $chatBotManagerView = chatBotManagerView();

        chatBotArea.appendChild($answerText01);
        chatBotArea.appendChild($answerText02);
        chatBotArea.appendChild($chatBotManagerView);

        setTimeout(() => makeLighter($answerText01), 500);
        setTimeout(() => makeLighter($answerText02), 1000);
        setTimeout(() => makeLighter($chatBotManagerView), 1500)
    }
]);

const eventToSearchChat = ($searchChat) => addEvent($searchChat, 
    [() => deleteChatNode()]);

const eventToClientChat = ($clientChat) => addEvent($clientChat, 
    [() => deleteChatNode()]);

export { eventToChatBot }