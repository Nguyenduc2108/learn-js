const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = $("#toast");
    if (main) {
        const toast = document.createElement("div");
        const icons = {
            success: "fa-solid fa-circle-check",
            info: "fa-solid fa-circle-info",
            warning: "fa-solid fa-circle-exclamation",
            error: "fa-solid fa-triangle-exclamation",
        };

        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
            <div class="toast__icon">
            <i class="${icon}"></i>
                
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            `;
        main.appendChild(toast);

        // Auto remove toast
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when close button clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
    }
}

function showSuccessToast() {
    toast({
        title: "Success",
        message: "Your request was successful",
        type: "success",
        duration: 3000,
    });
}

function showErrorToast() {
    toast({
        title: "Error",
        message: "Your request was not successful",
        type: "error",
        duration: 3000,
    });
}

toast({
    title: "Success 123123",
    message: "Your request was successful",
    type: "info",
    duration: 3000,
});
