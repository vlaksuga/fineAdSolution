(function ($) {
    "use strict";

    const START_DATE_GAP = 7;

    var today = new Date();
    var sDate = new Date(new Date().setDate(new Date().getDate() - START_DATE_GAP));
    var eDate = today;
    var area = '';
    var item = '';

    function toStringDate(date) {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() + 1;
        mm = mm >= 10 ? mm : '0' + mm;
        var dd = date.getDate();
        dd = dd >= 10 ? dd : '0' + dd;
        return yyyy + "-" + mm + "-" + dd; 
    };

    var dummyData = [
        { 'date': '2020-10-10', 'area': '영역1', 'item': '광고물1번', 'status': 'normal', 'imp': 20000, 'clicks': 12 },
        { 'date': '2020-10-08', 'area': '영역2', 'item': '광고물2번', 'status': 'normal', 'imp': 30000, 'clicks': 10 },
        { 'date': '2020-10-09', 'area': '영역3', 'item': '광고물2번', 'status': 'normal', 'imp': 12312300, 'clicks': 1120 }
    ];

    var dummyArealist = [
        {'area':'영역1'},
        {'area':'영역2'},
        {'area':'영역3'}
    ]

    var dummyAdItemlist = [
        {'item':'광고물1번'},
        {'item':'광고물2번'},
        {'item':'광고물3번'}
    ]

    function buildAreaList(list) {
        var areaList = document.getElementById('areaList');
        for(var i=0; i < list.length; i++) {
            var li = `<a href="#">
            <li class="my-2 areas" value="${list[i].area}">${list[i].area}</li>
            </a>`;
            areaList.innerHTML += li;
        }
    }

    function buildAdItemList(list) {
        var adItemList = document.getElementById('adItemList');
        for(var i=0; i < list.length; i++) {
            var li = `<a href="#">
            <li class="my-2 items">${list[i].item}</li>
            </a>`;
            adItemList.innerHTML += li;
        }
    }

    function bulidTable(data) {
        var table = document.getElementById('tableBody');
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
              <td class="text-center">${data[i].date}</td>
              <td class="text-center">${data[i].area}</td>
              <td class="text-center">${data[i].item}</td>
              <td class="text-center">${data[i].status}</td>
              <td class="text-right">${(data[i].imp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td class="text-right">${(data[i].clicks).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td class="text-right">${((data[i].clicks / data[i].imp) * 100).toFixed(3) + "%"}</td>
              </tr>`;
              table.innerHTML += row;
        }
    }

    $(function () {

        buildAreaList(dummyArealist);
        buildAdItemList(dummyAdItemlist);
        bulidTable(dummyData);

        $('#startDateValue').text(toStringDate(sDate));
        $('#startDatePicker').val(toStringDate(sDate));
        $('#endDateValue').text(toStringDate(eDate));
        $('#endDatePicker').val(toStringDate(eDate));

        // 어제
        $('#shortCutBox a:nth-child(1)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
            $('#startDatePicker').datepicker('setDate', new Date(new Date().setDate(new Date().getDate() - 1)));
            $('#startDatePicker').datepicker('update');
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
          
            $('#endDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
            $('#endDatePicker').datepicker('setDate', new Date(new Date().setDate(new Date().getDate() - 1)));
            $('#endDatePicker').datepicker('update');
            $('#endDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
        });

        // 이번주
        $('#shortCutBox a:nth-child(2)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(today.getDate() - today.getDay()))));
            $('#startDatePicker').datepicker('setDate', new Date(new Date().setDate(today.getDate() - today.getDay())));
            $('#startDatePicker').datepicker('update');
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(today.getDate() - today.getDay()))));

            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').datepicker('setDate', today);
            $('#endDatePicker').datepicker('update');
            $('#endDatePicker').val(toStringDate(today));
        });

        // 지난달
        $('#shortCutBox a:nth-child(3)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)));
            $('#startDatePicker').datepicker('setDate', new Date(today.getFullYear(), today.getMonth() - 1, 1));
            $('#startDatePicker').datepicker('update');
            $('#startDatePicker').val(toStringDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)));

            $('#endDateValue').text(toStringDate(new Date(today.getFullYear(), today.getMonth(), 0)));
            $('#endDatePicker').datepicker('setDate', new Date(today.getFullYear(), today.getMonth(), 0));
            $('#endDatePicker').datepicker('update');
            $('#endDatePicker').val(toStringDate(new Date(today.getFullYear(), today.getMonth(), 0)));
        });

        // 이번달
        $('#shortCutBox a:nth-child(4)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(today.getFullYear(), today.getMonth(), 1)));
            $('#startDatePicker').datepicker('setDate', new Date(today.getFullYear(), today.getMonth(), 1));
            $('#startDatePicker').datepicker('update');
            $('#startDatePicker').val(toStringDate(new Date(today.getFullYear(), today.getMonth(), 1)));

            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').datepicker('setDate', today);
            $('#endDatePicker').datepicker('update');
            $('#endDatePicker').val(toStringDate(today));
        });

        // 최근60일
        $('#shortCutBox a:nth-child(5)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 60))));
            $('#startDatePicker').datepicker('setDate', new Date(new Date().setDate(new Date().getDate() - 60)));
            $('#startDatePicker').datepicker('update');
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 60))));

            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').datepicker('setDate', today);
            $('#endDatePicker').datepicker('update');
            $('#endDatePicker').val(toStringDate(today));
        });

        // 최근90일
        $('#shortCutBox a:nth-child(6)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 90))));
            $('#startDatePicker').datepicker('setDate', new Date(new Date().setDate(new Date().getDate() - 90)));
            $('#startDatePicker').datepicker('update');
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 90))));
            
            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').datepicker('setDate', today);
            $('#endDatePicker').datepicker('update');
            $('#endDatePicker').val(toStringDate(today));
        });

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
        .on('changeDate', function(event){
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
        .on('changeDate', function(event){
            eDate = event.date;
            $('#endDateValue').text(toStringDate(eDate));                                   
        })
        ;

        // Area List
        $('.areas').on('click', function(){
            $('#areaValue').text($(this).text());
            $('#areaModal').modal('hide');
            area = $(this).text();
        });

        // Ad Item List
        $('.items').on('click', function(){
            $('#adItemValue').text($(this).text());
            $('#adItemModal').modal('hide');
            item = $(this).text();
        });

        
        // Submit
        $('#submitBox a').on('click', function () {
            // Validate Date
            if($('#startDatePicker').val() > $('#endDatePicker').val()) {
                alert('기간을 확인해 주세요')
                return false;
            } 
            // Validate Area
            else if(area == '') {
                alert('영역을 선택해 주세요');
                return false;
            } 
            else if(item == '') {
                alert('광고물을 선택해 주세요');
                return false;
            }
             else  {
                alert('good!');
                $('#tableBody').empty();
                bulidTable(dummyData);
            }
        });

    });
})(jQuery);