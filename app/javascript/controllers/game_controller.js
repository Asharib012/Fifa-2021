import ApplicationController from './application_controller'

export default class extends ApplicationController {
	static targets = [ 'minute', 'addText', 'proceed', 'form' ]

  static values = { id: String, user: String}
  
  connect(){
    super.connect()
    this.count()
  }

  increment(event){
    this.minuteTarget.value = parseInt(this.minuteTarget.value)+1
    this.count()
    this.request()
    
  }

  decrement(event){  
    if (parseInt(this.minuteTarget.value)>0){
      this.minuteTarget.value = parseInt(this.minuteTarget.value)-1
      this.count()
     this.request()
    }
  }

  request() {
    this.stimulate('Game#update', this.idValue, this.minuteTarget.value, this.userValue)
  }

  count(){
    var minutes = document.getElementsByClassName('minute')
    var total_minutes = 0
    for(let sum of minutes)
    {
      total_minutes += parseInt(sum.value)
    }

    var minute_text = document.getElementById("add-minutes-text") 
    var minute_btn = document.getElementById("add-minutes")
    var footer = document.getElementById("footer")
    if (total_minutes>0)
    { 
      minute_text.innerHTML= total_minutes + " minutes added to Compaign" 
      minute_btn.removeAttribute("disabled")
      if(total_minutes==1){
        footer.classList.add('animate__animated');
        footer.classList.add('animate__slideInUp');
      }
      
    }
    else{
      minute_text.innerHTML= "Add minutes added to Compaign"
      minute_btn.setAttribute("disabled", "disabled")
      footer.classList.remove('animate__animated');
      footer.classList.remove('animate__slideInUp');
    }

  }

  remove(){
    document.getElementById('badge').innerHTML = null
  }

}
