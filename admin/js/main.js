(function ($) {
    "use strict";

    const START_DATE_GAP = 7;
    const STATIC_SERVER_URI = "http://222.106.173.218:7788";

    var today = new Date();
    var sDate = new Date(new Date().setDate(new Date().getDate() - START_DATE_GAP));
    var eDate = today;
    var sitepkey, adpkey, areapkey;
    var startDateCode = toStringDate(sDate).split("-").join("");
    var endDateCode = toStringDate(eDate).split("-").join("");

    function toStringDate(date) {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() + 1;
        mm = mm >= 10 ? mm : '0' + mm;
        var dd = date.getDate();
        dd = dd >= 10 ? dd : '0' + dd;
        return yyyy + '-' + mm + '-' + dd;
    };

    var dummyArealist = [
        { 'area': '영역1' },
        { 'area': '영역2' },
        { 'area': '영역3' }
    ];

    var dummyAdItemlist = [
        { 'item': '광고물1번' },
        { 'item': '광고물2번' },
        { 'item': '광고물3번' }
    ];


    function buildAreaList() {
        $.ajax({
            url: STATIC_SERVER_URI + "/s/listArea.json",
            type: 'get',
            data: {},
            success: function (data) {
                var list = data.body.list;
                var areaList = document.getElementById('areaList');
                adItemList.innerHTML = '';
                for (var i = 0; i < list.length; i++) {
                    var li = `<a href="#">
                    <li class="my-2 areas" value="${list[i].areapkey}">${list[i].areaname}</li>
                    </a>`;
                    areaList.innerHTML += li;
                };
                $('.areas').on('click', function () {
                    $('#areaValue').text($(this).text());
                    $('#areaModal').modal('hide');
                    areapkey = $(this).val();
                    buildAdItemList(areapkey);
                });                
            }
        });
    };

    function buildAdItemList(areapkey) {

        $.ajax({
            url: STATIC_SERVER_URI + "/s/listAdByAreaPkey.json?areapkey=" + areapkey,
            type: 'get',
            data: {},
            success: function (data) {
                var list = data.body.list;
                var adItemList = document.getElementById('adItemList');
                adItemList.innerHTML = '';
                for (var i = 0; i < list.length; i++) {
                    var li = `<a href="#">
                    <li class="my-2 items" value="${list[i].adpkey}">${list[i].adname}</li>
                    </a>`;
                    adItemList.innerHTML += li;
                };
                $('.items').on('click', function () {
                    $('#adItemValue').text($(this).text());
                    $('#adItemModal').modal('hide');
                    adpkey = $(this).val();
                });
            }
        });

    };

    function bulidTable(adp, sd, ed) {
        $('#myTable').DataTable({
            destroy: true,
            ajax: {
                type: "get",
                url: STATIC_SERVER_URI + "/s/daily.json?adpkey=" + adp + "&syyyymmdd=" + sd + "&eyyyymmdd=" + ed,
                dataSrc: "body.list",
                dataType: "JSON"
            },
            columns: [
                {
                    data: 'yyyymmdd',
                    render: function (data, type, row) {
                        return data.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                    }
                },
                { data: 'adpkey' },
                { data: 'adpkey' },
                { data: 'adpkey' },
                { data: 'cnt' },
                { data: 'clickcnt' },
                {
                    data: 'ctr',
                    render: function (data, type, row) {
                        return data + '%';
                    }
                }
            ]
        });
    };

    function dateRangeShoutCut(name) {
        var startDate, endDate;
        switch (name) {
            case 'YESTERDAY':
                startDate = new Date(new Date().setDate(new Date().getDate() - 1));
                endDate = startDate;
                break;

            case 'THISWEEK':
                startDate = new Date(new Date().setDate(today.getDate() - today.getDay()));
                endDate = today;
                break;

            case 'LASTMONTH':
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;

            case 'THISMONTH':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = today;
                break;

            case 'LAST60DAYS':
                startDate = new Date(new Date().setDate(new Date().getDate() - 60));
                endDate = today;
                break;

            case 'LAST90DAYS':
                startDate = new Date(new Date().setDate(new Date().getDate() - 90));
                endDate = today;
                break;

            default:
                startDate = sDate;
                endDate = eDate;
        }

        $('#startDateValue').text(toStringDate(startDate));
        $('#startDatePicker').datepicker('setDate', startDate);
        $('#startDatePicker').datepicker('update');
        $('#startDatePicker').val(toStringDate(startDate));

        $('#endDateValue').text(toStringDate(endDate));
        $('#endDatePicker').datepicker('setDate', endDate);
        $('#endDatePicker').datepicker('update');
        $('#endDatePicker').val(toStringDate(endDate));
    }


    $(function () {
        sitepkey = '10944';
        adpkey = null;
        areapkey = null;

        buildAreaList();
        bulidTable(adpkey, startDateCode, endDateCode);

        $('#startDateValue').text(toStringDate(sDate));
        $('#startDatePicker').val(toStringDate(sDate));
        $('#endDateValue').text(toStringDate(eDate));
        $('#endDatePicker').val(toStringDate(eDate));

        $('#shortCutBox a:nth-child(1)').on('click', function () { dateRangeShoutCut('YESTERDAY'); });
        $('#shortCutBox a:nth-child(2)').on('click', function () { dateRangeShoutCut('THISWEEK'); });
        $('#shortCutBox a:nth-child(3)').on('click', function () { dateRangeShoutCut('LASTMONTH'); });
        $('#shortCutBox a:nth-child(4)').on('click', function () { dateRangeShoutCut('THISMONTH'); });
        $('#shortCutBox a:nth-child(5)').on('click', function () { dateRangeShoutCut('LAST60DAYS'); });
        $('#shortCutBox a:nth-child(6)').on('click', function () { dateRangeShoutCut('LAST90DAYS'); });

        // Start DatePicker
        $('#startDatePicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true
        })
            .on('hide', function (event) {
                event.preventDefault();
                event.stopPropagation();
            })
            .on('changeDate', function (event) {
                sDate = event.date
                $('#startDateValue').text(toStringDate(sDate));
            });


        // End DatePicker
        $('#endDatePicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true
        }).on('hide', function (event) {
            event.preventDefault();
            event.stopPropagation();
        })
            .on('changeDate', function (event) {
                eDate = event.date;
                $('#endDateValue').text(toStringDate(eDate));
            })
            ;


        // Submit
        $('#submitBox a').on('click', function () {
            console.log('click');
            // Validate Date
            if ($('#startDatePicker').val() > $('#endDatePicker').val()) {
                alert('기간을 확인해 주세요')
                return false;
            }
            // Validate Area
            else if (areapkey == null) {
                alert('영역을 선택해 주세요');
                return false;
            }
            else if (adpkey == null) {
                alert('광고물을 선택해 주세요');
                return false;
            }
            else {
                alert('good!');
                startDateCode = $('#startDatePicker').val().split("-").join("");
                endDateCode = $('#endDatePicker').val().split("-").join("");
                bulidTable(adpkey, startDateCode, endDateCode);
            };
        });
    });
})(jQuery);