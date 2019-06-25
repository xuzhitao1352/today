import '@/vendor/gt'

export default  function(options) {
	return new Promise((resolve, reject) => {
		window.initGeetest(options, captchaObj => {
			resolve(captchaObj)
		})
	})
}

// const captchaObj = await initGeetest({
//   // 必填参数
//   gt: data.gt,
//   challenge: data.challenge,
//   offline: !data.success,
//   new_captcha: true,
//   // 验证方式
//   product: 'bind'
// })

