

const phantom = require('phantom'); // import module 


async function earthquake2 ( callback ) {
     // await解決回調問題，創建一個phantom實例
    const instance = await phantom.create();
    // 通 過phantom 實例創建一個page對像，page對像可以理解成一個對頁面發起請求和處理結果這一集合的對像
    const page = await instance.createPage();
    //页面指向的是哪个一个url
    await page.on("onResourceRequested", function(requestData) {
        //console.info('Requesting', requestData.url)
    });
     //得到打开该页面的状态码
    const status = await page.open('https://www.mainpi.com/query?i=587');

    var result = await page.evaluate(function() {
      var count = 1;
      return $('.callnum_display.center-block').map(function() {
          return ({
              index: count++,
              title: $(this).find('span').text()
          })
      }).toArray()
	  //})
    })

    //输出内容
    console.log( new Date() ) ;
    console.log( result )
	console.log( JSON.stringify(result) )

	// if ( result[0].title == '17') {
	// 		job.cancel();
	// }
      
     //退出该phantom实例
    await instance.exit();
	
	//return result ; 
	// callback(result)

};

earthquake2();