$('#get_number').on('click', getNumber);
$('#reset').on('click', reset_list);
$('#show_random').on('click', showRandomNumber);

document.addEventListener('DOMContentLoaded', function() {
    var toggleSwitch = document.getElementById("toggle_random"); // Changed from "toggleSwitch" to "toggle_random"
    toggleSwitch.addEventListener("change", toggleRandomNumberVisibility);
});


function toggleRandomNumberVisibility() {
    var paragraph = document.getElementById("newnumber");
    var paragraphlist2 = document.getElementById("number_list");
    var paragraphlist3 = document.getElementById("number_list_2");
    
    var toggleSwitch = document.getElementById("toggle_random"); // Changed from "toggleSwitch" to "toggle_random"
    if (toggleSwitch.checked) {
        paragraph.style.visibility = "visible";  // Changed from "block" to "visible"
        paragraphlist2.style.visibility = "visible";  // Changed from "block" to "visible"
        paragraphlist3.style.visibility = "visible";  // Changed from "block" to "visible"
    } else {
        paragraph.style.visibility = "hidden";  // Changed from "none" to "hidden"
        paragraphlist2.style.visibility = "hidden";  // Changed from "block" to "visible"
        paragraphlist3.style.visibility = "hidden";  // Changed from "block" to "visible"
    }
}

// Initialize a variable to store the last generated random number
let lastRandomNumber = null;

let generated_number_list = {};
let generated_number_list_2 = [];

function getNumber(){
    var min_number = 1;
    var max_number = 12;
    var toggleSwitch = document.getElementById("toggle_random"); // Changed from "toggleSwitch" to "toggle_random"
    if (Object.keys(generated_number_list).length < 144){
        var [randomnumber, num1, num2] = generate_unique_multiplication();
        let paragraph = document.getElementById("newnumber");
        let num1Element = document.getElementById("num1"); // Existing Element
        let formattedExpression = `${num1} X ${num2}`;  // Formatted as per your requirement
        paragraph.innerHTML = randomnumber;
        num1Element.innerHTML = formattedExpression;  // Updated this line
        toggleRandomNumberVisibility();
        generated_number_list[randomnumber] = true;
        generated_number_list_2.push(randomnumber);
        lastRandomNumber = randomnumber;
        update_list();
        return true;
    } else {
        return false;
    }
}


function check_exist_number(value, dictionary){
	return (value in dictionary);
}

function generate_unique_multiplication(){
	var min_number = 1;
	var max_number = 12;
	var need_one_ind = 1;
	while(need_one_ind){
		var num1 = Math.floor(Math.random() * (max_number - min_number + 1) + min_number);
		var num2 = Math.floor(Math.random() * (max_number - min_number + 1) + min_number);
		var multiplication_result = num1 * num2;
		if(!check_exist_number(multiplication_result, generated_number_list)){
			return [multiplication_result, num1, num2]; // Updated to return num1 and num2
		}
	}
}


function update_list(){
	let paragraph_2 = document.getElementById("number_list");
	let paragraph_3 = document.getElementById("number_list_2");
	let existed_number = Object.keys(generated_number_list);
	let existed_number_in_ordered = generated_number_list_2.join(',');
	paragraph_2.innerHTML = "Here are the existed numbers in numerical order: " + existed_number;
	paragraph_3.innerHTML = "Here are the numbers in the order of drawing: " + existed_number_in_ordered;
}

function reset_list(){
	let paragraph_2 = document.getElementById("number_list");
	let paragraph_3 = document.getElementById("number_list_2");
	paragraph_2.innerHTML = " Click the Get number button to start the game! ";
	paragraph_3.innerHTML = " ";
	generated_number_list ={};
	generated_number_list_2 =[];
}

function showRandomNumber() {
    if (lastRandomNumber !== null) {
        alert("The last generated random number is: " + lastRandomNumber);
    } else {
        alert("No number has been generated yet.");
    }
}
