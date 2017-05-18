<template>
	<div class="jyc-wrap">
        <h2>Calendar</h2>
        <p class="detail">More infomation <a href="https://github.com/Wanderxx/vue-fullcalendar"> https://github.com/Wanderxx/vue-fullcalendar</a></p>
        <div class="ca-box" style="margin-top:20px;">
            <full-calendar :events="fcEvents" locale="en"></full-calendar>   
        </div>
    </div>
</template>

<script>
import fullCalendar from 'vue-fullcalendar'
export default {
    data() {
        return {
           fcEvents:[
                {
                  title : 'Sunny Out of Office',
                  start : '2017-05-11',
                  end : '2017-05-11'
                },
                {
                  title : 'Sunny Out of Office',
                  start : '2017-06-11',
                  end : '2017-06-11'
                },
                {
                  title : 'Sunny Out of Office',
                  start : '2017-05-21',
                  end : '2017-05-21'
                }
            ] 
        }
    },
    
    components: {
        fullCalendar
    },
   
    methods: {
      
    }
}
</script>
