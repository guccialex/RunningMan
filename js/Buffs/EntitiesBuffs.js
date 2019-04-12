class EntitiesBuffs{

	constructor(){
		this.listofbuffs = [];
	}

	//pass in a status effect to this buff
	addstatuseffect(statuseffect){
		//clone it and then add it
		this.listofbuffs.push(statuseffect.clonegetthis());
	}

	//add the buffs as a copy
	addbuffs(otherentitiesbuff){

		//clone each buff in the other object and add them to this one
		var tocopylistofbuffs = otherentitiesbuff.getbufflist();


		for (var currentbuff in tocopylistofbuffs){
			this.addstatuseffect(tocopylistofbuffs[currentbuff]);
		}

		//throw("where from");
	}

	/*
	//return a clone of this object
	clonegetthis(){

		var currentbuff = null;

		var copiedentitiesbuffs = new EntitiesBuffs();

		for (var currentbuff in this.listofbuffs){

			//clone and get each of the
			currentbuff = this.listofbuffs[currentbuff].clonegetthis();

			copiedentitiesbuffs.addstatuseffect(currentbuff);
		}

		return(copiedentitiesbuffs);
	}
	*/

	//get a list of the buffs in this object
	getbufflist(){

		return(this.listofbuffs);

	}






	//what happens every tick
	update(){

		//do a tick for each of the buffs
		for (var buff in this.listofbuffs){
			this.listofbuffs[buff].tick();
		}

		//remove the finished buffs
		var buffinter = 0;
		while(buffinter < this.listofbuffs.length){
			//when the current buff is one that needs to be removed
			if (this.listofbuffs[buffinter].isfinished()){
				//remove the buff
				this.listofbuffs.splice(buffinter, 1);
				//reduce the buff count by one to accomodate the removed one
				buffinter += -1
			}
			//increase buff counter
			buffinter += 1;
		}
	}








	//all the getters


	//strength
	//defense
	//speed
	//maxhp
	//maxmana
	//burn
	//betrayl
	//fast
	//slow
	//stop
	//invul
	//invis
	//regen
	//poison
	//knockback





	getstrengtheffect(){
		var totalstrength = 0;
		for (var buff in this.listofbuffs){
			totalstrength += this.listofbuffs[buff].getstrengtheffect();
		}
		return(totalstrength);
	}


	getspeedeffect(){
		var totalspeedeffect = 0;
		for (var buff in this.listofbuffs){
			totalspeedeffect += this.listofbuffs[buff].getspeedeffect();
		}
		return(totalspeedeffect);
	}


	getmaxhpeffect(){
		var totalmaxhpeffect = 0;
		for (var buff in this.listofbuffs){
			totalmaxhpeffect += this.listofbuffs[buff].getmaxhpeffect();
		}
		return(totalmaxhpeffect);
	}

	getmaxmanaeffect(){
		var totalmaxmanaeffect = 0;
		for (var buff in this.listofbuffs){
			totalmaxmanaeffect += this.listofbuffs[buff].getmaxmanaeffect();
		}
		return(totalmaxmanaeffect);
	}

	getdefenseeffect(){
		var totaldefense = 0;
		for (var buff in this.listofbuffs){
			totaldefense += this.listofbuffs[buff].getdefenseeffect();
		}
		return(totaldefense);
	}

	getbetrayl(){
		for (var buff in this.listofbuffs){
			if (this.listofbuffs[buff].getbetrayl() != null){
				return(true);
			}
		}
		return(false);
	}


	getbetraylside(){
		for (var buff in this.listofbuffs){
			if (this.listofbuffs[buff].getbetrayl() != null){
				return(this.listofbuffs[buff].getbetrayl());
			}
		}
		throw "they arent betraying";
	}

	getburn(){
		var totalburn = 0;
		for (var buff in this.listofbuffs){
			totalburn += this.listofbuffs[buff].getburn();
		}
		return(totalburn);
	}

	getfast(){
		var totalfast = 0;

		//the fast is a value above 0 thats how much faster
		//so like 0.3 fast is 1.3 times fast
		//i dont need to add the 1 at the end

		for (var buff in this.listofbuffs){
			totalfast += this.listofbuffs[buff].getfast();
		}
		return(totalfast);
	}

	getslow(){
		var totalslow = 0;

		//the slow is a value above 0 thats how much slower
		//so like 0.3 slow is 1.3 times slower
		//i dont need to add the 1 at the end

		for (var buff in this.listofbuffs){
			totalslow += this.listofbuffs[buff].getslow();
		}
		return(totalslow);
	}

	getstop(){
		for (var buff in this.listofbuffs){
			if (this.listofbuffs[buff].getstop() == true){
				return(true);
			}
		}
		return(false);
	}

	getinvul(){
		for (var buff in this.listofbuffs){
			if (this.listofbuffs[buff].getinvul() == true){

				return(true);
			}
		}
		return(false);
	}

	getinvis(){
		for (var buff in this.listofbuffs){
			if (this.listofbuffs[buff].getinvis() == true){
				return(true);
			}
		}
		return(false);
	}

	getregen(){
		var totalregen = 0;
		for (var buff in this.listofbuffs){
			totalregen += this.listofbuffs[buff].getregen();
		}
		return(totalregen);
	}


	getpoison(){
		var totalpoison = 0;
		for (var buff in this.listofbuffs){
			totalpoison += this.listofbuffs[buff].getpoison();
		}
		return(totalpoison);
	}



	getknockback(){
		var totalknockback = 0;
		var knockbackdirection = [1,0];
		for (var buff in this.listofbuffs){
			totalknockback += this.listofbuffs[buff].getknockback()[0];
			//get the direction of the first knockback thing
			if (this.listofbuffs[buff].getknockback()[0]){
				knockbackdirection = this.listofbuffs[buff].getknockback()[1];
			}
		}
		return([totalknockback,knockbackdirection]);
	}







}
