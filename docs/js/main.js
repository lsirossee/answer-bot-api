$('body').on('click', '#enquiry', function(){
    var comment = $('#comment').html();
    $('#list').html(comment);

    var payload = {
        "enquiry": "how to clean Lego",
        "locale": "en-us",
        "reference": "internal-note-demo"
    }

    var settings = {
        "url": "https://answer-bot-demo.verschoren.workers.dev/recommendations",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(payload),
    };

    $.ajax(settings).done(function (response) {
    console.log(response);
    });
});