$(function() {
					var GetQueryString = function(name) {
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
						var r = window.location.search.substr(1).match(reg);
						if (r != null) return unescape(r[2]);
						return null;
					}
					if (GetQueryString("area")) {
						console.log(GetQueryString("area"))
						$('#fenxiao').val(GetQueryString("area"))
					} else {
						$('#fenxiao').val("默认")
					}
					if (GetQueryString("uid")) {
						console.log(GetQueryString("uid"))
						$('#geneal').val(GetQueryString("uid"))
					} else {
						$('#geneal').val("默认")
					}
				$("#getyzm").click(function(event) {
					var phone = $("#phone").val();
					if (!phone) {
						alert('请输入手机号');
						return false;
					}
					var phone_re = /^0?1[3456789]\d{9}$/;
					if (!phone_re.test(phone)) {
						alert('请输入正确的手机号');
						return false;
					}
					$.ajax({
						url: 'http://zg99.offcn.com/index/biaodan/sendmsg?actid=11077&callback=?',
						type: 'GET',
						dataType: 'jsonp',
						data: {
							phone: phone
						},
						success: function(data) {
							if (data.status == "1") {
								//alert('正在发送请稍后...');
								alert('正在发送请稍后...');
								var sec = 120;
								$("#getyzm").text(sec + 's');
								var timer = setInterval(function() {
									sec--;
									$("#getyzm").text(sec + 's');
									if (sec < 1) {
										$("#getyzm").text('验证码');
										clearInterval(timer);
									}
								}, 1000);
								//window.location.href = "http://www.offcn.com";
							} else {
								//alert(data.msg);
								alert(data.msg);
							}
						}
					});
				});

				$("#dosubmit").click(function(event) {
					var name = $("#name").val();
					var phone = $("#phone").val();
					var area = $("#area").val();
					var yzm = $("#yzm").val();
					var geneal = $('#geneal').val();
					var fenxiao = $('#fenxiao').val();
					if (!name) {
						//alert('请输入姓名');
						alert('请输入姓名');
						return false;
					}
					var name_re = /^[\u4e00-\u9fa5]{0,}$/;
					if (!name_re.test(name)) {
						//alert('请输入正确的姓名');
						alert('请输入正确的姓名');
						return false;
					}
					if (!phone) {
						//alert('请输入手机号');
						alert('请输入手机号');
						return false;
					}
					var phone_re = /^0?1[3456789]\d{9}$/;
					if (!phone_re.test(phone)) {
						//alert('请输入正确的手机号');
						alert('请输入正确的手机号');
						return false;
					}
					if (!yzm) {
						//alert('请输入手机验证码');
						alert('请输入手机验证码');
						return false;
					}
					if (!area) {
						//alert('请输入手机验证码');
						alert('请填写技能');
						return false;
					}
					$.ajax({
						url: 'http://zg99.offcn.com/index/biaodan/register?actid=11077&callback=?',
						type: 'GET',
						dataType: 'jsonp',
						data: {
							name: name,
							phone: phone,
							area: area,
							yzm: yzm,
							geneal: geneal,
							fenxiao: fenxiao
						},

						success: function(data) {
							if (data.status == "1") {
								var str = '';
								if (data.tctext == "") { //超过14个字后要修改css
									alert(
										'提交成功'
									);
								} else {
									alert('弹窗设置不为空')
								}
								//alert(data.msg);							
							} else {
								//alert(data.msg);
								alert(data.msg);
							}
						}
					})
				});
			});
