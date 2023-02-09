import { BASE_COMMON_URL, HEADER, METHOD } from "../common/variable";

const fetchLoginID = ($IDInput, $PWInput) => {
    fetch(BASE_COMMON_URL + "/auth", {
        method: METHOD.POST,
        headers: HEADER.POST, 
        body: JSON.stringify({
            "id": $IDInput.value,
            "password": $PWInput.value
        })
    }).then((res) => {
        if(res.status === 201) {
            location.assign("/");
        }
        else {
            $IDInput.focus();
            alert("올바르지 않은 계정입니다.");
        }
    })
}

export { fetchLoginID }