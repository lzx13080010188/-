/**
 * 作者:邢峻华
 * 
 * */
var map;
var mapdiv="personmap";
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var infoWindow;
var initLONGIT;
var initLATIT;

var pointLineArr=new Array();
/**
 * nmmpGIS初始化
 */
$(document).ready(function() {
	/*initTabCheck();*/
	initMap(mapdiv);
	
});

/**
 * 标签tab页面切换方法初始化
 */
function initTabCheck(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	     // 获取已激活的标签页的名称
	     var activeTab = $(e.target).text();
	     // 获取前一个激活的标签页的名称
	     var previousTab = $(e.relatedTarget).text();
	     $(".active-tab span").html(activeTab);
	     $(".previous-tab span").html(previousTab);
	     if(activeTab=="巡检任务"){
	    	 mapdiv="taskmap";
	     }else if(activeTab=="资源管理"){
	    	 mapdiv="resourcemap";
	     }else if(activeTab=="代维人员"){
	    	 mapdiv="personmap";
	     }else if(activeTab=="签到管理"){
	    	 mapdiv="qiandaopersonmap";
	     }
	     initMap(mapdiv);
	 });
}


/**
 * 地图初始化
 * @param map 传递需要承载初始化地图的div的id
 */
function initMap(map){
	
	queryXunJianTaskPoints(wc_id);
	// 百度地图API功能
	map = new BMap.Map(map);    // 创建Map实例
	//map.centerAndZoom(new BMap.Point(125.32 , 43.90), 14);  // 初始化地图,设置中心点坐标和地图级别
	map.centerAndZoom(new BMap.Point(initLONGIT , initLATIT), 20);  // 初始化地图,设置中心点坐标和地图级别
	
	/*setTimeout(function(){
        map.setZoom(14);   
    }, 1000);*/
	//添加地图类型控件
	 map.addControl(new BMap.NavigationControl({  
         type: BMAP_NAVIGATION_CONTROL_LARGE, //表示显示完整的平移缩放控件。  
//       type: BMAP_NAVIGATION_CONTROL_SMALL, //表示显示小型的平移缩放控件。  
//       type: BMAP_NAVIGATION_CONTROL_PAN, //表示只显示控件的平移部分功能。  
//       type: BMAP_NAVIGATION_CONTROL_ZOOM, //表示只显示控件的缩放部分功能。  
         anchor: BMAP_ANCHOR_TOP_LEFT, //表示控件定位于地图的左上角。  
//       anchor: BMAP_ANCHOR_TOP_RIGHT, //表示控件定位于地图的右上角。  
//       anchor: BMAP_ANCHOR_BOTTOM_LEFT, //表示控件定位于地图的左下角。  
//       anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //表示控件定位于地图的右下角。  
         offset: new BMap.Size(20, -10)  
     })); //设置地图平移缩放控件，PC端默认位于地图左上方type控件外观,anchor控件的停靠位置,offset偏移的位置  
     map.addControl(new BMap.MapTypeControl({  
         type: BMAP_MAPTYPE_CONTROL_HORIZONTAL,//按钮水平方式展示，默认采用此类型展示。  
//       type: BMAP_MAPTYPE_CONTROL_DROPDOWN,//按钮呈下拉列表方式展示。  
//       type: BMAP_MAPTYPE_CONTROL_MAP//以图片方式展示类型控件，设置该类型后无法指定maptypes属性。  
         mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]  
     }));//设置地图类型控件,type控件样式,mapTypes控件展示的地图类型，默认为普通图、卫星图、卫星加路网混合图和三维图。通过此属性可配置控件展示的地图类型。   
	map.setCurrentCity("通化");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
	//定义地图显示信息窗口
    infoWindow = new BMap.InfoWindow();  // 创建信息窗口对象
    infoWindow.addEventListener('open',function(){
	});
	window.map = map;
}

/**
 * 查询任务路线经纬度点
 * @param 完成进度ID parent_id
 */
function queryXunJianTaskPoints(parent_id){
	$.ajax({
	    type: 'post',
	    url: basePath+'/nmmpgis/queryXunJianTaskPoints',
	    contentType: 'application/json;charset=utf-8',
	    //data: '{"wanchengjinduId":"601532"}',    //测试使用
	    data: '{"wanchengjinduId":"'+parent_id+'"}',
	    success: function (data) { //返回json结果
	    	var resultArr=data.data.results;
	    	console.log(resultArr);
	    	drawXunjianTaskPoints(resultArr);
	    	console.log(resultArr);
	    	initLONGIT = resultArr[0].LONGIT;
	    	initLATIT = resultArr[0].LATIT;
	    	console.log("初始化经度:"+initLONGIT);
	    	console.log("初始化纬度:"+initLATIT);
	    }
	});
}

/**
 * 向地图上画任务固定的点
 * @param pointArr
 */
function drawXunjianTaskPoints(pointArr){
	console.log(pointArr);
	var newmap = window.map;
	var dwpoint=null;
	var myIcon =null;
	var pois=[];
	myIcon =new BMap.Icon("image/dh.png", new BMap.Size(17,17));
	$.each(pointArr, function (i, n) {
		var resPoint = marsTobaidu(new BMap.Point(n.LONGIT, n.LATIT));
		console.log(resPoint);
		var point = new BMap.Point(resPoint.lng,resPoint.lat);
		pois.push(point);
		var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		newmap.addOverlay(marker);
		newmap.centerAndZoom(point, 9);// 将标注添加到地图中
		pointLineArr.push(point);
	});
	var polyline = new BMap.Polyline(pointLineArr, {strokeColor:"blue", strokeWeight:5,strokeOpacity:0,strokeStyle:'dashed'});	
	newmap.addOverlay(polyline);
}

/**
 * GPS经纬度转换到百度经纬度
 * @param mars_point
 * @returns {___anonymous20991_21008}
 */
function marsTobaidu(mars_point) {
    var baidu_point = { lng: 0, lat: 0 };
    var x = mars_point.lng;
    var y = mars_point.lat;

    var longP=parseFloat(x);
    var lantP=parseFloat(y);  
    var gcj02p = wgs84togcj02(longP,lantP); 
    var bd9p = gcj02tobd09(gcj02p[0],gcj02p[1]);
    
    baidu_point.lng = bd9p[0].toFixed(6);
    baidu_point.lat = bd9p[1].toFixed(6);
    return baidu_point;
}
/**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
*/
function out_of_china(lng, lat) { 
	return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

function transformlat(lng, lat) { 
	var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
	ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
	ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
	return ret
}
function transformlng(lng, lat) { 
	var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
	ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
	ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
	return ret
}
/**
* WGS84转GCj02
* @param lng
* @param lat
* @returns {*[]}
*/
function wgs84togcj02(lng, lat) { 
	if (out_of_china(lng, lat)) {
		return [lng, lat]
	}
	else {
		var dlat = transformlat(lng - 105.0, lat - 35.0);
		var dlng = transformlng(lng - 105.0, lat - 35.0);
		var radlat = lat / 180.0 * PI;
		var magic = Math.sin(radlat);
		magic = 1 - ee * magic * magic;
		var sqrtmagic = Math.sqrt(magic);
		dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
		var mglat = lat + dlat;
		var mglng = lng + dlng;
		return [mglng, mglat]
	}
}
/**
* 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
* 即 百度 转 谷歌、高德
* @param bd_lon
* @param bd_lat
* @returns {*[]}
*/ 
	function bd09togcj02(bd_lon, bd_lat) { 
	　　var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	　　var x = bd_lon - 0.0065;
	　　var y = bd_lat - 0.006;
	　　var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	　　var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	　　var gg_lng = z * Math.cos(theta);
	　　var gg_lat = z * Math.sin(theta);
	　　return [gg_lng, gg_lat]
	}
/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02tobd09(lng, lat) { 

	var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_pi);
	var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_pi);
	var bd_lng = z * Math.cos(theta) + 0.0065;
	var bd_lat = z * Math.sin(theta) + 0.006;

	return [bd_lng, bd_lat]
}
/**
* GCJ02 转换为 WGS84
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02towgs84(lng, lat) { 
	if (out_of_china(lng, lat)) {
		return [lng, lat];
	}
	else {
		var dlat = transformlat(lng - 105.0, lat - 35.0);
		var dlng = transformlng(lng - 105.0, lat - 35.0);
		var radlat = lat / 180.0 * PI;
		var magic = Math.sin(radlat);
		magic = 1 - ee * magic * magic;
		var sqrtmagic = Math.sqrt(magic);
		dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
		mglat = lat + dlat;
		mglng = lng + dlng;
		return [lng * 2 - mglng, lat * 2 - mglat];
	}
}

