// var link = document.getElementById("get_number");
// link.onclick = getNumber();
$('#get_number').on('click', getNumber);
$('#reset').on('click', reset_list);
let generated_number_list = {};
let generated_number_list_2 = [];

function getNumber(){
	var min_number = 1;
	var max_number = 99;
	var range = max_number + 1 ;
	if (Object.keys(generated_number_list).length < 99){
		var randomnumber = generate_number();
		let paragraph = document.getElementById("newnumber")
		paragraph.innerHTML = randomnumber;
		generated_number_list[randomnumber] = true;
		generated_number_list_2.push(randomnumber);
		update_list();
		return true;
	} else{
		return false;
	}
	
}

function check_exist_number(value, dictionary){
	return (value in dictionary);
}

function generate_number(){
	var min_number = 1;
	var max_number = 75;
	var range = max_number - min_number + 1;
	var need_one_ind = 1;
	while(need_one_ind){
		var temp = Math.floor(Math.random() *range + min_number);
		if(!check_exist_number(temp, generated_number_list)){
			return temp;
		}
	}
}

function update_list(){
	let paragraph_2 = document.getElementById("number_list");
	let paragraph_3 = document.getElementById("number_list_2");
	let existed_number = Object.keys(generated_number_list);
	let existed_number_in_ordered = generated_number_list_2.join(', ');
	paragraph_2.innerHTML = "Here are the list of existed numbers: " + existed_number;
	paragraph_3.innerHTML = "Here are the numbers in the drawing order: " + existed_number_in_ordered;

function reset_list(){
	let paragraph_2 = document.getElementById("number_list");
	paragraph_2.innerHTML = " Click the Get number botton to start the game! ";
	generated_number_list ={};
}