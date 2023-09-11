$('#get_number').on('click', getNumber);
$('#reset').on('click', reset_list);
$('#show_random').on('click', showRandomNumber);
document.addEventListener('DOMContentLoaded', function() {
    var toggleSwitch = document.getElementById("toggleSwitch");
    toggleSwitch.addEventListener("change", toggleRandomNumberVisibility);
});

function toggleRandomNumberVisibility() {
    var paragraph = document.getElementById("newnumber");
    var toggleSwitch = document.getElementById("toggleSwitch");
    if (toggleSwitch.checked) {
        paragraph.style.display = "block";
    } else {
        paragraph.style.display = "none";
    }
}

// Initialize a variable to store the last generated random number
let lastRandomNumber = null;

let generated_number_list = {};
let generated_number_list_2 = [];


function getNumber(){
	var min_number = 1;
	var max_number = 12;
    var toggleSwitch = document.getElementById("toggleSwitch");
	if (Object.keys(generated_number_list).length < 144){
		var [randomnumber, num1, num2] = generate_unique_multiplication(); // Updated to receive num1 and num2
		let paragraph = document.getElementById("newnumber");
        let formattedNum1 = num1.toString().padStart(2, '0');  // Add leading spaces
        let formattedNum2 = num2.toString().padStart(2, '0');  // Add leading spaces
		let num1Element = document.getElementById("num1"); // New Element
		let num2Element = document.getElementById("num2"); // New Element
        paragraph.innerHTML = randomnumber;
        toggleRandomNumberVisibility();
		// paragraph.innerHTML = randomnumber;
        num1Element.innerHTML = "Num 1: " + formattedNum1;
        num2Element.innerHTML = "Num 2: " + formattedNum2;
		generated_number_list[randomnumber] = true;
		generated_number_list_2.push(randomnumber);
        lastRandomNumber = randomnumber;
		update_list();
		return true;
	} else{
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
