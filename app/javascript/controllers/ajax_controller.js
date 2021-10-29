import { Controller } from 'stimulus'; 
import Rails from "@rails/ujs";
export default class extends Controller {
	static targets = [ 'minute', 'addText', 'proceed', 'form' ]

  connect() {
    this.count()

  }
  increment(event){
    var time = parseInt(this.minuteTarget.value)+1
    this.request(time)
  }

  decrement(event){  
    if (parseInt(this.minuteTarget.value)>0){
      var time = parseInt(this.minuteTarget.value)-1
     this.request(time)
    }
  }

  request(time){
    var _this=this
    Rails.ajax({
      url: _this.formTarget.action,
      type: "put",
      data: new URLSearchParams({'minutes': time}).toString(), 
      success: function(data) {
          _this.minuteTarget.value = String(time)  
          _this.count()
          console.log("ok")
       }
      }) 
  }

  count(){
    var minutes = document.getElementsByClassName('minute')
    var total_minutes = 0
    for(let sum of minutes)
    {
      total_minutes += parseInt(sum.value)
    }
    console.log(total_minutes)
  
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
}