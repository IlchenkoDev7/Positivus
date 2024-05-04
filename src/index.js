import './index.html';
import './index.scss';

var radioButtons = document.querySelectorAll('input[name="request-type"]');

radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        if (this.checked) {
            var selectedValue = this.value;
            console.log("Selected value:", selectedValue);
        }
    });
});