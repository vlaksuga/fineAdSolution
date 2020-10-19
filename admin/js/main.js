(function ($) {
    "use strict";

    const START_DATE_GAP = 7;

    var today = new Date();
    var sDate = new Date(new Date().setDate(new Date().getDate() - START_DATE_GAP));
    var eDate = today;

    function toStringDate(date) {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() + 1;
        mm = mm >= 10 ? mm : '0' + mm;
        var dd = date.getDate();
        dd = dd >= 10 ? dd : '0' + dd;
        return yyyy + "-" + mm + "-" + dd;
    };


    $(function () {

        // 날짜 초기화
        $('#startDateValue').text(toStringDate(sDate));
        $('#startDatePicker').val(toStringDate(sDate));
        $('#endDateValue').text(toStringDate(eDate));
        $('#endDatePicker').val(toStringDate(eDate));

        // 어제
        $('#shortCutBox a:nth-child(1)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
            $('#endDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
            $('#endDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 1))));
        });

        // 이번주
        $('#shortCutBox a:nth-child(2)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(today.getDate() - today.getDay()))));
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(today.getDate() - today.getDay()))));
            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').val(toStringDate(today));
        });

        // 지난달
        $('#shortCutBox a:nth-child(3)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)));
            $('#startDatePicker').val(toStringDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)));
            $('#endDateValue').text(toStringDate(new Date(today.getFullYear(), today.getMonth(), 0)));
            $('#endDatePicker').val(toStringDate(new Date(today.getFullYear(), today.getMonth(), 0)));
        });

        // 이번달
        $('#shortCutBox a:nth-child(4)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(today.getFullYear(), today.getMonth(), 1)));
            $('#startDatePicker').val(toStringDate(new Date(today.getFullYear(), today.getMonth(), 1)));
            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').val(toStringDate(today));
        });

        // 최근60일
        $('#shortCutBox a:nth-child(5)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 60))));
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 60))));
            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').val(toStringDate(today));
        });

        // 최근90일
        $('#shortCutBox a:nth-child(6)').on('click', function () {
            $('#startDateValue').text(toStringDate(new Date(new Date().setDate(new Date().getDate() - 90))));
            $('#startDatePicker').val(toStringDate(new Date(new Date().setDate(new Date().getDate() - 90))));
            $('#endDateValue').text(toStringDate(today));
            $('#endDatePicker').val(toStringDate(today));
        });

        // submit
        $('#submitBox a').on('click', function () {
            alert('적용');
        });

        $('#startDatePicker').datepicker({
            format: 'yyyy-mm-dd'
        }).on('hide', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $('#endDatePicker').datepicker({
            format: 'yyyy-mm-dd'
        }).on('hide', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    });
})(jQuery);