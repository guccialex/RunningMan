
//stores the unlocked classes and skills
class UnlockedStorage{

	constructor(){
		//array of the classes that have been unlocked
		this.unlockedclasses = [];


		//a string of the class name
		//and a string of the skill
		//throw an error if its looking for a skill un a locked class
		this.unlockedskills = [];
	}


	//is this class unlocked
	isclassunlocked(nameofclass){
		return(this.unlockedclasses.includes(nameofclass));
	}

	//overwriting of the isunlocked function
	//for knowing what skills of the class are unlocked
	isskillunlocked(skill){

		return(this.unlockedskills.includes(skill));
	}

	//add the classes that have been unlocked
	addclassunlocked(nameofclass){
		//make sure that you dont add the same thing twice
		if(this.unlockedclasses.includes(nameofclass)){

			//if its already in the array, do nothing
			//but tell me
			console.log("the class is already unlocked")
		}
		else{
			//add it
			this.unlockedclasses.push(nameofclass);

		}
	}


	addskillunlocked(skill){
		//later make sure that you dont add the same thing twice
		if(this.unlockedskills.includes(skill)){

			//if its already in the array, do nothing
			//but tell me
			console.log("the skill is already unlocked")
		}
		else{

			//add it
			this.unlockedskills.push(skill);
		}
	}
}