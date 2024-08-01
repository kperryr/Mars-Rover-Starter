class Rover {
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage(message){

      
      let arr = Object.values(message);
      let newObj = {"message": arr[0]};

      newObj["results"] = [];



      for (let i in arr[1]){
         if (arr[1][i].commandType === "STATUS_CHECK") {
            newObj.results.push({"completed":true,"roverStatus":{"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position}});
            
         }else if (arr[1][i].commandType === "MODE_CHANGE") {
            newObj.results.push({"completed":true});
            this.mode = arr[1][i].value;

         }else{
            if (this.mode === "LOW_POWER") {
               newObj.results.push({"completed":false});
            
            } else {
               this.position = arr[1][i].value;
               newObj.results.push({"completed":true});
            }
         }

      }

      return newObj;
   }


}



module.exports = Rover;