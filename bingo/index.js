$(function() {
    var bingo = {
        selectedNumbers: [],
        generateRandom: function() {
            var min = 1;
            var max = 90;
            var random = Math.floor(Math.random() * (max - min+1)) + min;
            return random;
        },
        generateNextRandom: function() {
            if (bingo.selectedNumbers.length > 89) {
                alert("Finish !!!");
                return 0;
            }
            var random = bingo.generateRandom();
            while ($.inArray(random, bingo.selectedNumbers) > -1) {
                random = bingo.generateRandom();
            }
            bingo.selectedNumbers.push(random);
            return random;
        }
    };
    $('td').each(function() {
        var concatClass = this.cellIndex + "" + parseInt(this.parentNode.rowIndex+1);
        if(parseInt(concatClass, 10)%10 == 0){
            var numberString =  parseInt(this.cellIndex +1) + "0";
        }else{
            var numberString = parseInt(concatClass, 10).toString();
        }
        $(this).addClass("cell" + numberString).text(numberString);
    });
    $('#btnGenerate').click(function() {
        var random = bingo.generateNextRandom().toString();
        $('.bigNumberDisplay span').text(random);
        $('td.cell' + random).addClass('selected');
    });
    window.onbeforeunload = function(e) {
        e = e || window.event;
        var returnString = 'Are you sure?';
        if (e) {
            e.returnValue = returnString;
        }
        return returnString;
    };
});