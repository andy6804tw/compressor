
let compressRatio = 0.9, // 圖片壓縮比例
    imgNewWidth = 400; // 圖片新寬度

const fileUploader = document.getElementById("file-uploader");

/**
 * Image File to base64 format
 * @param {*} file
 * Return:
 *      回傳base64圖片格式字串 data:image/jpeg;base64,XXXXX
 */
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

/**
 * Imput image File then response width、height and <img> DOM
 * @param {*} file 
 * Return:
 *      {<img> Dom} img,
 *      {圖片高} height,
 *      {圖片寬} width
 */
const getSize = (file) => new Promise((resolve, reject) => {
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    img.onload = () => resolve({ img, height: img.height, width: img.width });
    img.onerror = reject;
    img.src = _URL.createObjectURL(file);
});

/**
 * Compressing image by HTML5 canvas
 * @param {*} file 
 * @param {*} sizeImage 
 * @param {*} oldImg 
 * Return:
 *      {原始圖片base64格式} oldImg
 *      {原始圖片大小} oldImageSize, 
 *      {原始圖片寬} width, 
 *      {原始圖片長} height, 
 *      {壓縮後圖片} newImg,
 *      {壓縮後圖片大小} newImageSize, 
 *      {壓縮後圖片長} imgNewHeight, 
 *      {壓縮後圖片寬} imgNewWidth
 */
const getCompressImage = (file, sizeImage, oldImg) => new Promise((resolve, reject) => {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let width = sizeImage.width, // 圖片原始寬度
        height = sizeImage.height, // 圖片原始高度
        imgNewHeight = imgNewWidth * height / width; // 圖片新高度
    // 取得原始圖片大小
    const oldImageSize = Math.round(file.size / 1000);
    // 使用 canvas 調整圖片寬高
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    // 調整canvas圖片尺寸
    context.drawImage(sizeImage.img, 0, 0, width, height);
    // 顯示新圖片
    let newImg = canvas.toDataURL("image/jpeg", compressRatio).split(",")[1];
    oldImg = oldImg.split(",")[1]
    // 取得壓縮後圖片大小
    const newImageSize = Math.round(0.75 * newImg.length / 1000);
    resolve({ oldImg, oldImageSize, width, height, newImg, newImageSize, imgNewHeight, imgNewWidth });
});

/**
 * Comparison of image use juxtapose.js
 * @param {*} imgBefore 
 * @param {*} imgAfter 
 */
const compareImage = (imgBefore, imgAfter) => {
    const juxtaposeDom = document.getElementsByClassName('juxtapose')[0];
    juxtaposeDom.innerHTML = "";
    juxtaposeDom.classList.add("animate__fadeIn");
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

    // clear watermark
    setTimeout(function () {
        document.getElementsByClassName("jx-knightlab")[0].remove();
        juxtaposeDom.classList.remove("animate__fadeIn");
    }, 500)
}
