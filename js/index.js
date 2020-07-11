const juxtaposeDemo = document.getElementsByClassName("juxtapose-demo")[0];
const demoImageList=['https://i.imgur.com/LLcYT76.png','https://i.imgur.com/eB8uL3y.png','https://i.imgur.com/M7APpgf.png','https://i.imgur.com/ak1Donj.png']
const demoId=Math.floor(Math.random() * 4);

juxtaposeDemo.innerHTML = "";
// juxtaposeDemo.classList.add("animate__fadeIn");
    slider = new juxtapose.JXSlider('.juxtapose-demo',
        [
            {
                src: demoImageList[demoId],
                label: 'Before',
                // credit: 'Image Credit'
            },
            {
                src: demoImageList[demoId],
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