$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data.txt",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines);
    createForm(lines);
}

function createForm(lines) {
    // creates long list of options stored in options var
    var options;
    for (i=0; i < lines.length; i++) {
        // gets e.g. <option>connection</option>
        var option = "<option>";
        option += lines[i][2];
        option += "</option>";
        // appends to options
        options += option;
    }
    
    // creates individual selects and appends to html div
    for (i=0; i < lines.length; i++) {
        // <div class="form-group"><label for="exampleFormControlSelect
        var text = '<div class="form-group"><label for="exampleFormControlSelect';
        // <div class="form-group"><label for="exampleFormControlSelect0">
        text += i.toString() + '">';
        // <div class="form-group"><label for="exampleFormControlSelect0">Example and Example
        text += lines[i][0] + " and " + lines[i][1];
        // <div class="form-group"><label for="exampleFormControlSelect0">Example and Example</label>
        text += "</label>";
        // select portion
        text += '<select class="form-control" id="exampleFormControlSelect';
        text += i.toString() + '">';
        text += options;
        text += "</select></div>";

        //append to html div
        document.getElementById('target').innerHTML += text;
    }
}