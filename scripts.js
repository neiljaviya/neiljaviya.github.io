document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for section visibility
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll behavior for the header
    var prevScrollpos = window.pageYOffset;
    var headerDiv = document.querySelector("header");
    var headerBottom = headerDiv.offsetTop + headerDiv.offsetHeight;

    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;

        // If we're scrolling up, or we haven't passed the header, show the header at the top
        if (prevScrollpos > currentScrollPos || currentScrollPos < headerBottom) {  
            headerDiv.style.top = "0";
        } else {
            // Otherwise, we're scrolling down & have passed the header, so hide it
            headerDiv.style.top = "-7.2rem";
        } 

        prevScrollpos = currentScrollPos;
    }

    const toggle = document.getElementById('video-toggle');
    const videoElement = document.getElementById('backgroundVideo');
    const svg = document.getElementById('morph-svg');
    const path = svg.querySelector('path');
    
    // Array of video sources
    const videoLinks = [
        "https://video.wixstatic.com/video/4e2524_3f7134b315b44c55a5843d07bb9603aa/1080p/mp4/file.mp4",
        "https://video.wixstatic.com/video/4e2524_71f1ce2afcb8429183ce20ea2669731b/1080p/mp4/file.mp4",
        "https://video.wixstatic.com/video/4e2524_f81975297769434b886596f7f12e4017/1080p/mp4/file.mp4",
        "https://video.wixstatic.com/video/4e2524_99b195101134482a94d3bb1a52f6b427/1080p/mp4/file.mp4"
    ];

    let currentIndex = 0;
    
    // Apply the flooding effect
    svg.style.transform = 'scale(1)';
    path.setAttribute('d', 'M 0 0 Q 50 100 100 0 V 0 H 0 Z');

    setTimeout(() => {toggle.addEventListener('change', () => {
        currentIndex = (currentIndex + 1) % videoLinks.length;
        videoElement.src = videoLinks[currentIndex];
        videoElement.play();
    });
            // Reverse the SVG morph to complete the transition
            svg.style.transform = 'scale(1)';
            path.setAttribute('d', 'M 0 100 Q 50 0 100 100 V 100 H 0 Z');
        }, 1500); // Delay to match the transition time
});
