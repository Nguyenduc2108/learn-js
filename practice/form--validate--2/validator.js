function Validator(formSelector) {
    // function getParent(element, selector) {
    //     while (element.parentElement) {
    //         if (element.parentElement.matches(selector)) {
    //             return element.parentElement;
    //         }
    //         element = element.parentElement;
    //     }
    // }

    var formRules = {};

    /**
     * Quy ước tạo rule:
     * - Khi có lỗi thì trả ra message lỗi
     * - Khi không có lỗi thì không trả ra cái gì cả
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : "Vui lòng nhập trường này";
        },
        email: function (value) {
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            return regex.test(value) ? undefined : "Trường này phải là email";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Vui lòng nhập nhiều nhất ${max} ký tự`;
            };
        },
    };

    // Lấy ra element của form cần validate
    var formElement = document.querySelector(formSelector);

    // Kiểm tra xem formElement có tồn tại hay không
    if (formElement) {
        var inputs = formElement.querySelectorAll("[name][rules]");

        for (var input of inputs) {
            var rules = input.getAttribute("rules").split("|");

            for (var rule of rules) {
                var isRuleHasValue = rule.includes(":");
                var ruleInfo;

                if (isRuleHasValue) {
                    ruleInfo = rule.split(":");
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện để validate (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for (var rule of rules) {
                errorMessage = rule(event.target.value);

                if (errorMessage) break;
            }

            if (errorMessage) {
                var formGroup = event.target.closest(".form-group");
                if (formGroup) {
                    formGroup.classList.add("invalid");

                    var formMessage = formGroup.querySelector(".form-message");
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        // Hàm clear message lỗi
        function handleClearError(event) {
            var formGroup = event.target.closest(".form-group");
            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");

                var formMessage = formGroup.querySelector(".form-message");
                if (formMessage) {
                    formMessage.innerText = "";
                }
            }
        }
    }
    var _this = this;

    // Xử lý hành vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll("[name][rules]");
        var isValid = true;

        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        if (isValid) {
            if (typeof _this.onSubmit === "function") {
                var enableInputs = formElement.querySelectorAll("[name]");
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case "radio":
                            values[input.name] = formElement.querySelector(
                                "input[name='" + input.name + "']:checked"
                            ).value;
                            break;
                        case "checkbox":
                            if (!input.matches(":checked")) {
                                values[input.name] = "";
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case "file":
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }

                    return values;
                }, {});

                return _this.onSubmit(formValues);
            }

            formElement.submit();
        }
    };

    console.log(formRules);
}
