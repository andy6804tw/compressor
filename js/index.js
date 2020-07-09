
let compressRatio = 0.9, // 圖片壓縮比例
    imgNewWidth = 400, // 圖片新寬度
    canvas = document.createElement("canvas"),
    context = canvas.getContext("2d");
let imgDom;
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

    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;

    img.src = _URL.createObjectURL(file);
    imgDom = img;
});

document.getElementById("file-uploader").addEventListener('change', async (event) => {
    const file = fileUploader.files[0];
    const sizeImage = await getSize(file);
    const oldImageUrl = await toBase64(file);
    const compImage = await getCompressImage(file, sizeImage, oldImageUrl);
    console.log(compImage.oldImg);
    compareImage(compImage.oldImg, compImage.newImg);
});



const getCompressImage = (file, sizeImage, oldImg) => new Promise((resolve, reject) => {
    var width = sizeImage.width, // 圖片原始寬度
        height = sizeImage.height, // 圖片原始高度
        imgNewHeight = imgNewWidth * height / width, // 圖片新高度
        html = "",
        newImg;

    console.log("檔案大小約 " + Math.round(file.size / 1000));

    // 使用 canvas 調整圖片寬高
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);

    // 調整圖片尺寸
    context.drawImage(imgDom, 0, 0, width, height);

    // 顯示新圖片
    newImg = canvas.toDataURL("image/jpeg", compressRatio).split(",")[1];
    oldImg = oldImg.split(",")[1]
    console.log("檔案大小約 " + Math.round(0.75 * newImg.length / 1000));
    resolve({ oldImg, width, height, newImg, imgNewHeight, imgNewWidth });
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
