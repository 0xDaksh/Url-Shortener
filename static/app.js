var vue = Vue;
var nav = new vue({
	el: '#nav',
	data: {
		logo: {
			name: 'Daksh Miglani',
			url: 'https://dak.sh',
            v2: 'https://dak.sh/u/'
		},
		twitter: {
			name: '@Dakshster',
			url: 'https://twitter.com/Dakshster'
		},
		github: {
			name: 'Github',
			url: 'https://github.com/Dakshster'
		}
	}
});
var app = new vue({
    el: '#app',
    data: {
        main: {
            title: 'Shorten Your Link with Dak.sh Easily.',
            desc: 'Create Small links for your Customers Ease!'
        }
    }
});
$(document).ready(function(){
    $('form').submit(function(evt){
        evt.preventDefault();
          var formData = {
            'url': $('input[name=url]').val()
        };
        $.ajax({
            type: 'POST',
            url: '/make',
            data: formData,
            dataTyoe: 'json',
            encode: true
        }).done(function(data) {
            console.log(data);
            if(data.error) {
                $('.show').html('<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> Please use a Valid Url!</div>');
            } else {
                $('.show').html('<div class="alert alert-success" role="alert"><strong>Successfully Created! </strong> Here it is - <a href="'+ data.short +'" class="alert-link">' + data.short + '</a>.</div>');
            }
        });
        
    });
});