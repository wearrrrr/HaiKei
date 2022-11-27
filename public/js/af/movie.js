var movieId = $('#main-wrapper').data('id');
var clickedLoadComment = false;
var initDisqus = false;

function loadDisqus() {
    let url = $('.btn-comment-tab.active').data('type') === 'anime' ? movie.shortlink : episode_play.shortlink;
    $('.btn-load-comment').hide();
    if (!initDisqus) {
        var disqus_config = function() {
            this.page.url = url;
        };
        (function() {
            var d = document,
                s = d.createElement('script');
            s.src = '//' + site_config.disqus + '/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            initDisqus = true;
        })();
    } else {
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.url = url;
                }
            });
        }
    }
}

function getsrv() {

    //Get Server
    $.get('/' + movieId, function(res) {
        if (res.status) {
            $('#dt_sv').html(res.html);
            //Select Server
            $('.server-item').click(function() {
                $('.server-item .btn').removeClass('active');
                $(this).find('.btn').addClass('active');
                localStorage.setItem('currentSource', $(this).data('type'));
                localStorage.setItem('currentServer', $(this).data('server-id'));
                var linkIframe = $(this).data('embed');
                $('#embed-loading').hide();
                $('#iframe-embed').attr('src', linkIframe);
                $('#iframe-embed').show();
            });

            var currentSource = localStorage.getItem('currentSource');
            if (currentSource && $('.servers-' + currentSource).length > 0) {
                var currentServer = localStorage.getItem('currentServer');
                var svEl = $('.servers-' + currentSource + ' .server-item[data-server-id=' + currentServer + ']');
                if (currentServer && svEl.length > 0) {
                    svEl.click();
                } else {
                    $('.servers-' + currentSource + ' .server-item').first().click();
                }
            } else {
                $('.servers-mixed .server-item').first().click();
            }
        }
    });
    //Select Server
    //Get Server

}

function countViewMovie() {
    setTimeout(function() {
        $.post('/' + movieId, function(res) {});
    }, 1000 * 60);
}

function nextEpisode() {
    var nextEl = $('.ep-item.active').next();
    if (nextEl.length > 0) window.location.href = nextEl.attr('href');
}

function prevEpisode() {
    var prevEl = $('.ep-item.active').prev();
    if (prevEl.length > 0) window.location.href = prevEl.attr('href');
}

function voteSubmit(data) {
    if (!loading) {
        loading = true;
	console.log(data);
        $.post('/pages/voter.php', data, function(res) {
            $('#vote-loading').hide();
            $('#vote-info').html(res.html);
            toastr.success(res, "", { timeout: 5000 });
            loading = false;
        });
    }
}

function pwToggleVisible() {
  let pwInput = document.getElementById("re-password");
    if (pwInput.type === "password") {
        pwInput.type = "text";
    } else {
        pwInput.type = "password";
    }
}


$(document).ready(function() {
    if (page == "movie_info") {
        $.get('/' + movieId + '?page=' + page, function(res) {
            if (res.status) $('#watch-list-content').html(res.html);
        });
    }
    if (page == "movie_watch") {

        getsrv();
        if (parseInt(userSettings.auto_play) === 1) $('.quick-settings[data-option="auto_play"]').removeClass('off');
        if (parseInt(userSettings.auto_next) === 1) $('.quick-settings[data-option="auto_next"]').removeClass('off');







        $('.btn-comment-tab').click(function() {
            $('.btn-comment-tab').removeClass('active');
            $(this).addClass('active');
            loadDisqus();
        });

        $('.btn-load-comment').click(function() {
            clickedLoadComment = true;
            $(this).hide();
            loadDisqus();
        });

        $('#logout').click(function(e) {
            $.post('/logout')
            location.reload()
        });

        $("#media-resize").click(function(e) {
            $(".anis-watch-wrap").toggleClass("extend");
            if ($(".anis-watch-wrap").hasClass('extend')) {
                $(this).html('<i class="fas fa-compress mr-1"></i>Collapse');
            } else {
                $(this).html('<i class="fas fa-expand mr-1"></i>Expand');
            }
        });

        $("#turn-off-light").click(function(e) {
            $("#mask-overlay, .anis-watch-wrap").toggleClass("active");
        });

        $("#mask-overlay").click(function(e) {
            $("#mask-overlay, .anis-watch-wrap").removeClass("active");
            $("#turn-off-light").removeClass("off");
        });

        $(document).on("click", ".btn-vote", function() {
            $('#vote-loading').show();
            var mark = $(this).data('mark');
        //     $(this).setAttribute("disabled", true);
            var movieid = $(this).data('movieid');
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.execute(recaptchaSiteKey, { action: 'vote' }).then(function(_token) {
                    voteSubmit({ movieid, mark, _token });
                })
            } else {
                voteSubmit({ movieid, mark, _token: '' });
            }
        });
    }
});

$(document).on("click", ".ep-page-item", function() {
    $('.ep-page-item').removeClass('active');
    $('.ep-page-item .ic-active').hide();
    $(this).addClass('active');
    $(this).find('.ic-active').show();
    $('.ss-list-min').hide();
    $('#episodes-page-' + $(this).data('page')).show();
    $('#current-page').text($(this).text().trim());
});