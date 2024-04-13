document.addEventListener("DOMContentLoaded", function () {
    const questionMarks = document.querySelectorAll(".question-mark");

    const e_g = document.querySelector('#e_g');
    const e_e = document.querySelector('#e_e');
    const e_d = document.querySelector('#e_d');

    const error_g = document.querySelector('.error_g');
    const error_e = document.querySelector('.error_e');
    const error_d = document.querySelector('.error_d');

    const explanations = {
        "gross-income": "Gross annual income refers to your total income before any deductions or taxes.",
        "extra-income": "Extra income includes any additional earnings from sources other than your primary income.",
        "age-group": "Please enter your age group in years.",
        "deductions": "Total applicable deductions are any eligible expenses or deductions that reduce your taxable income."
    };
    var l = 0;
    let xPos;
    let yPos;

    questionMarks.forEach(questionMark => {
        questionMark.addEventListener("click", function (event) {
            xPos = event.clientX;
            yPos = event.clientY;
            console.log(xPos);
            l = 1;
            console.log("right")
            const targetId = this.getAttribute("data-target");
            const targetInput = document.getElementById(targetId);

            if (targetInput) {
                toggleTooltip(this, targetInput);
            }

            setTimeout(() => {
                console.log("Delayed for 1 second.");
                l = 0;
            }, 100);

            console.log(l);

        });
    });


    document.addEventListener("click", function () {
        if (!(l == 1)) {
            hideAllTooltips();
            console.log("clear")
            console.log(l);
        }
    });

    function toggleTooltip(questionMark, targetInput) {
        const tooltip = createTooltip(questionMark, targetInput);

        // Toggle tooltip visibility
        if (tooltip.style.display === "block") {
            tooltip.style.display = "none";
        } else {
            // Hide all tooltips before displaying the current one
            hideAllTooltips();
            tooltip.style.display = "block";
        }
    }

    function createTooltip(questionMark, targetInput) {


        const container = questionMark.parentNode;

        // Create or retrieve the tooltip element
        let tooltip = container.querySelector('.tooltip_');

        if (!tooltip || !tooltip.classList.contains("tooltip_")) {
            tooltip = document.createElement("div");
            tooltip.className = "tooltip_";
            tooltip.textContent = explanations[targetInput.getAttribute("name")];


            // questionMark.parentNode.insertBefore(tooltip, questionMark);

            // labelElement.parentNode.insertBefore(tooltip, labelElement);

            questionMark.parentNode.insertBefore(tooltip, questionMark);
            tooltip.style.left = `${xPos - 20}px`;
            tooltip.style.top = `${yPos - 120}px`;
            // positionAppendedElement(tooltip, xPos, yPos);
        }

        return tooltip;
    }

    function hideAllTooltips() {
        const tooltips = document.querySelectorAll(".tooltip_");
        tooltips.forEach(tooltip => {
            tooltip.style.display = "none";
        });
    }





    // Add event listener for mouseenter (hover) on triggerElement
    e_g.addEventListener('mouseenter', () => {
        // Show the hiddenContent
        error_g.style.display = 'block';
        console.log("enter")
    });

    // Add event listener for mouseleave (hover off) on triggerElement
    e_g.addEventListener('mouseleave', () => {
        // Hide the hiddenContent
        error_g.style.display = 'none';
    });


    e_d.addEventListener('mouseenter', () => {
        // Show the hiddenContent
        error_d.style.display = 'block';
        console.log("enter")
    });

    // Add event listener for mouseleave (hover off) on tridderElement
    e_d.addEventListener('mouseleave', () => {
        // Hide the hiddenContent
        error_d.style.display = 'none';
    });


    e_e.addEventListener('mouseenter', () => {
        // Show the hiddenContent
        error_e.style.display = 'block';
        console.log("enter")
    });

    // Add event listener for mouseleave (hover off) on trieeerElement
    e_e.addEventListener('mouseleave', () => {
        // Hide the hiddenContent
        error_e.style.display = 'none';
    });







//===================================================================validation====================================================================



    function checkValidity() {
        const grossIncomeInput = document.getElementById('gross-income');
        const e_g = document.getElementById('e_g');
        const extraIncomeInput = document.getElementById('extra-income');
        const e_e = document.getElementById('e_e');
        const deductionsInput = document.getElementById('deductions');
        const e_d = document.getElementById('e_d');
        const ageGroupSelect = document.getElementById('age-group');


        let isValid = true;

        if ((grossIncomeInput.value.trim() == '')) {
            isValid = false;
            
            e_g.style.display = "flex";
            error_g.textContent=""
            error_g.textContent="Input field is mandatory"

        } else if((grossIncomeInput.value < 0)||(isNaN(grossIncomeInput.value))){
            isValid = false;
            
            e_g.style.display = "flex";
            error_g.textContent=""
            error_g.textContent="Please input numbers only"

        }

        if ((extraIncomeInput.value.trim() === '')) {
            isValid = false;
            
            e_e.style.display = "flex";
            error_e.textContent=""
            error_e.textContent="Input field is mandatory"
        } else if((extraIncomeInput.value < 0)||(isNaN(extraIncomeInput.value))){
            isValid = false;
            
            e_e.style.display = "flex";
            error_e.textContent=""
            error_e.textContent="Please input numbers only"

        }

        if ((deductionsInput.value.trim() === '')) {
            isValid = false;
            
            e_d.style.display = "flex";
            error_d.textContent=""
            error_d.textContent="Input field is mandatory"
        } else if((deductionsInput.value < 0)||(isNaN(deductionsInput.value))){
            isValid = false;
            
            e_d.style.display = "flex";
            error_d.textContent=""
            error_d.textContent="Please input numbers only"

        }

        if (ageGroupSelect.value === '') {
            isValid = false;
            ageGroupSelect.classList.add('is-invalid');
        } else {
            ageGroupSelect.classList.remove('is-invalid');
        }

        return isValid;
    }




    // ============================================================TAX CALCULATION====================================================================
    const form = document.querySelector('.form');
    form.addEventListener('submit', (event) => {
        if (!checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
        event.preventDefault();


        const grossIncome = parseFloat(document.getElementById('gross-income').value) || 0;
        const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;
        const ageGroup = document.getElementById('age-group').value;
        // const result = document.getElementByClassName('result');
        const result = document.querySelector('.result');


        // Calculate overall income after deductions
        const overallIncome = grossIncome + extraIncome - deductions;

        // Calculate taxable amount (income over 8 Lakhs)
        const taxableAmount = Math.max(overallIncome - 800000, 0);

        // Determine tax rate based on age group
        let taxRate;
        if (ageGroup === '40') {
            taxRate = 0.3; // 30% tax for age < 40
        } else if (ageGroup === '40-60') {
            taxRate = 0.4; // 40% tax for age ≥ 40 but < 60
        } else if (ageGroup === '60') {
            taxRate = 0.1; // 10% tax for age ≥ 60
        }

        // Calculate tax amount
        const taxAmount = taxRate ? taxableAmount * taxRate : 0;

        let income = 0;

        if (taxableAmount == 0) {
            income = overallIncome;
        }
        else {
            income = overallIncome - taxAmount;
        }
        // alert(`Tax Amount: ${income}`);

        const taxResultElement = document.getElementById('income');
        taxResultElement.textContent = `${income}`;
        result.style.display = "flex";
    }
    form.classList.add('was-validated');
    });

});




//========================================================================FORM VALIDATION==========================================================



// (() => {
//     'use strict'

//     function checkValidity() {
//         const grossIncomeInput = document.getElementById('gross-income');
//         const e_g = document.getElementById('e_g');
//         const extraIncomeInput = document.getElementById('extra-income');
//         const e_e = document.getElementById('e_e');
//         const deductionsInput = document.getElementById('deductions');
//         const e_d = document.getElementById('e_d');
//         const ageGroupSelect = document.getElementById('age-group');


//         let isValid = true;

//         if ((grossIncomeInput.value < 0) || (grossIncomeInput.value.trim() === '')) {
//             isValid = false;
//             // grossIncomeInput.classList.add('is-invalid');
//             e_g.style.display = "flex";
//             console.log("e_g")

//         } else {
//             grossIncomeInput.classList.remove('is-invalid');
//         }

//         if ((extraIncomeInput.value < 0) || (extraIncomeInput.value.trim() === '')) {
//             isValid = false;
//             extraIncomeInput.classList.add('is-invalid');
//             e_e.style.display = "flex";
//         } else {
//             extraIncomeInput.classList.remove('is-invalid');
//         }

//         if ((deductionsInput.value < 0) || (deductionsInput.value.trim() === '')) {
//             isValid = false;
//             deductionsInput.classList.add('is-invalid');
//             e_d.style.display = "flex";
//         } else {
//             deductionsInput.classList.remove('is-invalid');
//         }

//         if (ageGroupSelect.value === '') {
//             isValid = false;
//             ageGroupSelect.classList.add('is-invalid');
//         } else {
//             ageGroupSelect.classList.remove('is-invalid');
//         }

//         return isValid;
//     }

//     const form = document.querySelector('.form');
//     form.addEventListener('submit', event => {
//         if (!checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//     });
// })()
