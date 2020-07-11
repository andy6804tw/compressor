const juxtaposeDemo = document.getElementsByClassName("juxtapose-demo")[0];
juxtaposeDemo.innerHTML = "";
// juxtaposeDemo.classList.add("animate__fadeIn");
    slider = new juxtapose.JXSlider('.juxtapose-demo',
        [
            {
                src: `https://i.imgur.com/LLcYT76.png`,
                label: 'Before',
                // credit: 'Image Credit'
            },
            {
                src: `https://i.imgur.com/LLcYT76.png`,
                label: 'After',
                // credit: "Image Credit"
            }
        ],
        {
            animate: true,
            showLabels: true,
            showCredits: true,
            startingPosition: "30%",
            makeResponsive: true
        });

    // clear watermark
    setTimeout(function () {
        document.getElementsByClassName("jx-knightlab")[0].remove();
    }, 500)