var a;
var b;

var app = new Vue({
    el: '#doc',
    data: {
        startDate: '',
        endDate: '',
        datesToShow: []
    },
    computed: {
        // start: function () {
        //     var app1 = this;
        //     return moment(app1.startDate, "MM-DD-YYYY");
        // },
        // end: function (){
        //     var app1 = this;
        //     return moment(app1.endDate, "MM-DD-YYYY");
        // }
    },
    methods:{
        updateDateRange: function () {
            var app1 = this;
            // app1.startDate = new Date($('#startDate').val());
            // app1.endDate = new Date($('#endDate').val());

            app1.startDate = $('#startDate').val();
            app1.endDate = $('#endDate').val();

            var start = new Date(app1.startDate);
            var end = new Date(app1.endDate);

            // var start = app1.startDate;
            // var end = app1.endDate;

            while (start <= end){
                app1.datesToShow.push(moment(start).format('DD-MM-YYYY'));
                start = new Date(start.setDate(start.getDate() + 1));
            }
        }
    },
    mounted: function () {

    }
});