//  调用$.get、$.post、$.ajax之前会先调用此函数
$.ajacPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})