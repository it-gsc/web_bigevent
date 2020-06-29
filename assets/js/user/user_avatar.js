// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);
//  注册上传点击事件
$('#imgBtn').on('click', function(e) {
    e.preventDefault();
    $(this).prev().click();

});
// 更改图片为文件选择框绑定 change 事件
$('#file').on('change', function(e) {
    // 获取用户选择的文件
    var filelist = e.target.files
    if (filelist.length === 0) {
        return layer.msg('请选择照片！')
    }

    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    console.log(filelist);
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
});
//  上传图片
$('#uploadbtn').on('click', function(e) {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串 
    //  2. 发送ajax请求， 把头像上传到服务器
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            window.parent.getUserInfo();
        }
    })
});
// 1.4 若有头像则加载个人头像
function loadImage() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.data.user_pic) {
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', res.data.user_pic) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        }
    })
}
loadImage();