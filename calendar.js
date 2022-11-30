"use strict";
$(document).ready(function () {
    var getMonthText = function (currentMonth) {
        if (currentMonth === 0) { return "January"; }
        else if (currentMonth === 1) { return "February"; }
        else if (currentMonth === 2) { return "March"; }
        else if (currentMonth === 3) { return "April"; }
        else if (currentMonth === 4) { return "May"; }
        else if (currentMonth === 5) { return "June"; }
        else if (currentMonth === 6) { return "July"; }
        else if (currentMonth === 7) { return "August"; }
        else if (currentMonth === 8) { return "September"; }
        else if (currentMonth === 9) { return "October"; }
        else if (currentMonth === 10) { return "November"; }
        else if (currentMonth === 11) { return "December"; }
    };

    /*This should return the last day of the current month*/
    var getLastDayofMonth = function (currentMonth) {
        //declared a new date object = dt
        var dt = new Date();
        //this is setting the month to the current plus 1
        dt.setMonth(currentMonth + 1);
        //this is declaring the date(day) to 0 so it would return the last day of the last month
        //working backwards eg: December 1 after this it will be november 30th
        dt.setDate(0);
        //return the dt object which will get the last day
        return dt.getDate();
    };

    /* I first started by trying to use the same dt object outside of the function
    but failed I am not sure if its possible but i wanted to save time and space without declaring anther date object. */

    //so thismonth and today object of date will be used to display the month and year
    var today = new Date();
    var thisMonth = today.getMonth();

    /*I wanted to place this inside a function to keep things displayed nicely but I was not able to figure out how
    since all I know is creating a handler function that can start with an id. I will research more  */

    //this is grabbing the id month_year and using the text jquery method to get the html contents and places the getmonthtext function 
    //passing through the date object thismonth. This is to concat the month and the 4 digit year.
    $("#month_year").text(getMonthText(thisMonth) + " " + today.getFullYear());


    //I declared the lastdayofmonth to reference the value while i use it inside the for loop
    var lastDayOfMonth = getLastDayofMonth(thisMonth);

    /*i used so many variables that I used rows as one to keep things legible to the reader
    but this rows variable gets the id calendar html contents. to ensure all new tags will be concat after the already existing content.*/
    var rows = $("#calendar").html();

    /* this for loop will go through the days of the current month and 
    as it iterates through it will set the date of today object to add one to i
    and use the updated number as current date.*/
    for (let i = 0; i < lastDayOfMonth; i++) {
        today.setDate(i + 1);

        //get the current date and day and use the variables 
        //inside the if loops
        var date = today.getDate();
        var day = today.getDay();

        /* this is to check if its the first of the month or the day is sunday,
        if so it will add a new row. */
        if (date === 1 || day === 0) {
            rows = rows.concat("<tr>");
        }

        /* this is going to add blank dates at the beginning of the calendar until the day of the week 
        has been reached  */
        if (date === 1) {
            var start = 0;
            while (start < day) {
                rows = rows.concat("<td></td>");
                start++;
            }
        }
        //this concat will go in order as passed through 
        rows = rows.concat("<td>", date, "</td>");

        /*this will add blanks to the end of the month until the last day of the week ends. */
        if (date === lastDayOfMonth) {
            start = day;
            while (start < 6) {
                rows = rows.concat("<td></td>");
                start++;
            }
        }
        //end the row if its the last day of the month or the day is saturday
        if (date === lastDayOfMonth || day === 6) {
            rows = rows.concat("</tr>");
        }

    };
    //this is to display the rows on the calendar 
    $("#calendar").html(rows);
});