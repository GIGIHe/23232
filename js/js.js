$(function () {

    var GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    if (GetQueryString("tid")) {
        console.log(GetQueryString("tid"))
        $('#tid').val(GetQueryString("tid"))
    } else {
        $('#tid').val("默认")
    }
    $(".con2_btn").click(function () {
        //手机号
        var name = $("#name").val();
        var city = $(".city").val();
        var ksxm = $(".ksxm").val();
        var tid = $("#tid").val();
        var phone = $("#tel").val();
        var yzm = $('#yzm').val();
        var reg = /^0?1[3456789]\d{9}$/;
        var length = phone.length;
        if (phone == null || phone == '') {
            alert('请填写手机号');
            return false;
        }
        if (!reg.test(phone) || length != 11) {
            alert('请填写正确的手机号');
            return false;
        }
        //姓名
        if (name == null || name == '') {
            alert('请填写姓名');
            return false;
        }
        //短信验证码
        if (yzm == null || yzm == '') {
            alert('请填写验证码');
            return false;
        }
        if (city == '') {
            alert('请选择地市');
            return false;
        }
        if (ksxm == '') {
            alert('请选择考试项目');
            return false;
        }

        $.getJSON("http://zg99.offcn.com/index/biaodan/register?actid=9719&callback=?", {
            'name': name,
            'phone': phone,
            'ds': city,
            'ksxm': ksxm,
            'yzm': yzm,
            'tid': tid
        }, function (data) {
            if (data.status == 1) {
                alert('预约成功~')
                window.location.reload()
            } else {
                alert(data.msg);
            }
        });
    });

    //点击获取验证码- 验证
    $('#getyzm').click(function () {
        var phone = $('#tel').val();
        var reg = /^0?1[3456789]\d{9}$/;
        var length = phone.length;
        if (phone == null || phone == '') {
            alert('请填写手机号');
            return false;
        }

        if (!reg.test(phone) || length != 11) {
            alert('请填写正确的手机号');
            return false;
        }

        $.getJSON("http://zg99.offcn.com/index/biaodan/sendmsg?actid=9719&callback=?", {
            'phone': phone
        }, function (data) {
            if (data.status == 1) {
                alert('正在发送请稍后...');
                var sec = 60;
                $("#getyzm").text(sec + 's');
                var timer = setInterval(function () {
                    sec--;
                    $("#getyzm").text(sec + 's');
                    if (sec < 1) {
                        $("#getyzm").text('获取');
                        clearInterval(timer);
                    }
                }, 1000);
            } else {
                alert(data.msg);
                return false;
            }
        });
    });
    $('.return-top').click(function () {
        $('html,body').animate({
            scrollTop: 0
        })
    })
    $('.fixb').click(function () {
        $('html,body').animate({
            scrollTop: $('.form').offset().top
        })
    })
})