var a;
var b;

var server = 'http://127.0.0.1:8000';

var app = new Vue({
    el: '#doc',
    data: {
        startDate: '',
        endDate: '',
        datesToShow: [],
        rooms: ['e'],
        bookings: []
    },
    computed: {
        readableStart: function () {
            var app1 = this;
            return moment(app1.startDate, 'DD-MM-YYYY').format('dddd Do MMM, YYYY');
        },
        readableFinish: function () {
            var app1 = this;
            return moment(app1.endDate, 'DD-MM-YYYY').format('dddd Do MMM, YYYY');
        }
    },
    methods:{
        updateDateRange: function () {
            var app1 = this;

            //re initialize the list
            app1.datesToShow = [];

            app1.startDate = app1.getFirstDayOfCurrentMonth();
            app1.endDate = app1.getLastDayOfCurrentMonth();

            var start = new Date(app1.convertDMYToMDY(app1.startDate));
            var end = new Date(app1.convertDMYToMDY(app1.endDate));

            while (start <= end){
                app1.datesToShow.push(moment(start).format('DD-MM-YYYY'));
                start = new Date(start.setDate(start.getDate() + 1)); // increment date
            }
        },
        dayOfDate: function (date) {
            return date.split('-')[0];
        },
        convertDMYToMDY: function (date) {
            var newDate = date.split('-');
            return newDate[1] + '-' + newDate[0] + '-' + newDate[2]
        },
        convertYMDToDMY: function (date) {
            var newDate = date.split('-');
            return newDate[2] + '-' + newDate[1] + '-' + newDate[0]
        },
        convertDMYToYMD: function (date) {
            var newDate = date.split('-');
            return newDate[2] + '-' + newDate[1] + '-' + newDate[0]
        },
        loadBooking: function (room) {
            var app1 = this;
            var url = server+'/bookings/?room='+room+'&start='+app1.convertDMYToYMD(app1.startDate)+'&end='+
                app1.convertDMYToYMD(app1.endDate);

        //    The date period will be loaded from the vue data
            var bookings = [];

            if(app1.startDate !== undefined){
                $.ajax({
                    url: url,
                    async: false,
                    success: function (data) {
                        bookings = data;
                    }
                });
            }

            return bookings;
        },
        getFirstDayOfCurrentMonth: function () {
            var date = new Date(),
                y = date.getFullYear(),
                m = date.getMonth();
            return moment(new Date(y, m, 1)).format('DD-MM-YYYY');
        },
        getLastDayOfCurrentMonth: function () {
            var date = new Date(),
                y = date.getFullYear(),
                m = date.getMonth();
            return moment(new Date(y, m + 1, 0)).format('DD-MM-YYYY');
        },
        loadRooms: function () {
            var app1 = this;
            $.get(server+'/rooms', function (data) {
                app1.rooms = data;
            })
        },
        openCreateBooking: function () {

        }
    },
    mounted: function () {
        var app1 = this;
        app1.loadRooms();
        app1.updateDateRange();
    }
});