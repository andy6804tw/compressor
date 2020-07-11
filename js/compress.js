
let compressRatio = 0.9, // 圖片壓縮比例
    imgNewWidth = 400; // 圖片新寬度
// let imgDom;
const fileUploader = document.getElementById("file-uploader");

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const getSize = (file) => new Promise((resolve, reject) => {
    var _URL = window.URL || window.webkitURL;
    var img = new Image();

    img.onload = () => resolve({ img, height: img.height, width: img.width });
    img.onerror = reject;

    img.src = _URL.createObjectURL(file);
    // imgDom = img;
});


const getCompressImage = (file, sizeImage, oldImg) => new Promise((resolve, reject) => {
    console.log('tag');
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    var width = sizeImage.width, // 圖片原始寬度
        height = sizeImage.height, // 圖片原始高度
        imgNewHeight = imgNewWidth * height / width, // 圖片新高度
        html = "",
        newImg;
    const oldImageSize=Math.round(file.size / 1000);
    console.log("檔案大小約 " + Math.round(file.size / 1000));

    // 使用 canvas 調整圖片寬高
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);

    // 調整圖片尺寸
    context.drawImage(sizeImage.img, 0, 0, width, height);

    // 顯示新圖片
    newImg = canvas.toDataURL("image/jpeg", compressRatio).split(",")[1];
    oldImg = oldImg.split(",")[1]
    const newImageSize=Math.round(0.75 * newImg.length / 1000);
    console.log("檔案大小約 " + Math.round(0.75 * newImg.length / 1000));
    resolve({ oldImg,oldImageSize, width, height, newImg,newImageSize, imgNewHeight, imgNewWidth });
});

/** Comparison of image */
const compareImage = (imgBefore, imgAfter) => {
    document.getElementsByClassName('juxtapose')[0].innerHTML = '';
    slider = new juxtapose.JXSlider('.juxtapose',
        [
            {
                src: `data:image/jpeg;base64,${imgBefore}`,
                label: 'Before',
                // credit: 'Image Credit'
            },
            {
                src: `data:image/jpeg;base64,${imgAfter}`,
                label: 'After',
                // credit: "Image Credit"
            }
        ],
        {
            animate: true,
            showLabels: true,
            showCredits: true,
            startingPosition: "50%",
            makeResponsive: true
        });


    setTimeout(function () {
        document.getElementsByClassName("jx-knightlab")[0].remove();
    }, 500)
}
