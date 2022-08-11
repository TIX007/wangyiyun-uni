#### 微信背景音乐设置方式

```
const bgAudioManager = uni.getBackgroundAudioManager();
bgAudioManager.title = '致爱丽丝';
bgAudioManager.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
小程序平台，需在manifest.json 对应的小程序节点下，填写"requiredBackgroundModes": ["audio"]。发布小程序时平台会审核
```

#### 歌曲时间转换秒数

```
formatTimeToSec(value){
				let arr = value.split(':')
				return (Number(arr[0]*60) +  Number(arr[1])).toFixed(1)
			}
```

#### 万亿过滤器

```
Vue.filter('formatCount',function(value){
	
	if( value >= 10000 && value <= 100000000){
		value /= 1000;
		return value.toFixed(1) + '万'
	}else if(value > 100000000){
		value /= 100000000
		return value.toFixed(1) + '亿'
	}else{
		return value
	}
})
```

#### 日期过滤器

```
Vue.filter('formatTime',function(value){
	var data = new Date(value)
	return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDay() + '日'
})
```

#### 音乐滚动效果

```
歌词滚动原理
将每行歌词前面的时间解析后，转为毫秒，这样播放器在播放的时候可以获取到播放时间，然后拿着时间查找当前时间对应哪一行歌词，然后在查看当前时间对应该行的哪一个字，然后进行相应的绘制

```

