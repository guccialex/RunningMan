class AllAI{

  constructor() {


    //the controllers for all the NPC objects

    this.AIcontrollers = [];

  }

  update() {

    for (AIcontroller in this.AIcontrollers) {

      this.AIcontrollers[AIcontroller].update();

    }

  }

}
