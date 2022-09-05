(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);

//validation

var nameErr = document.getElementById('name-error');
var emailErr = document.getElementById('email-err');
var msgErr = document.getElementById('msg-error');
var subErr = document.getElementById('sub-error');

function validateName() {
    var name = document.getElementById('txtname').value;

    if (name.length == 0) {
        nameErr.innerHTML = 'Name is required';
        nameErr.style.color = 'red';
        return false;
    }

    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameErr.innerHTML = 'Enter full name';
        nameErr.style.borderColor = 'red';
        nameErr.style.color = 'red';
        return false;
    }
    nameErr.innerHTML = "Name is Valid";
    nameErr.style.color = 'green';
    return true;
}

function validateEmail() {
    var email = document.getElementById('txtemail').value;

    if (email.length == 0) {
        emailErr.innerHTML = 'Email is required';
        emailErr.style.color = 'red'
        return false;
    }

    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailErr.innerHTML = 'Enter a valid email';
        emailErr.style.color = 'red';
        return false;
    }
    emailErr.innerHTML = "Valid Email";
    emailErr.style.color = 'green';
    return true;
}

function validateSub() {
    var subject = document.getElementById('txtsub').value;

    if (subject.length == 0) {
        subErr.innerHTML = "Please Enter Your Subject";
        subErr.style.color = 'red';
        return false;
    }
    subErr.innerHTML = "Subject is valid";
    subErr.style.color = 'green';
    return true;

}

function validateMsg() {
    var msg = document.getElementById('txtmsg').value;

    if (msg.length < 10) {
        msgErr.innerHTML = 'Please add more content in the message';
        msgErr.style.color = 'red';
        return false;
    }
    msgErr.innerHTML = "Message is valid";
    msgErr.style.color = 'green';
    return true;
}

function validateForm() {
    if (!validateName() || !validateEmail() || !validateMsg() || !validateSubject()) {
        return false;
    }
    //Submission
    $("#submit-form").submit((e) => {
        e.preventDefault()
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzKSZdiuyvEQTR_qsZAF-oMIfgZl_WqOXKKdxNjA0tRK0UJNXdbB8j6wFAwqJWhFp1t/exec",
            data: $("#submit-form").serialize(),
            method: "post",
            success: function (response) {
                alert("Form submitted successfully")
                window.location.reload()
                //window.location.href="https://google.com"
            },
            error: function (err) {
                alert("Something Error")

            }
        })
    })
    return true

}

