import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import timeRangeData from './timeRangeData.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================
	// 业务逻辑
	// =============================
	// 隐藏保障计划title
	$("#pt-sp-nav").css("display","none");
	getPrem();
	// 逻辑:根据保障期限变化重新计算保费
	// 条件:1:1天；7:7天；30:30天；180:6个月；365:1年；
	new selectOne($("#timeRange"), "保障期限", timeRangeData, timeRange).init();

	function timeRange(content, value) {
		parsObj.extraParams.timeRange = value;
		getPrem();
		return true;
	}

	// 逻辑: 根据算参数获取保费,并存储公共数据对象
	// 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
	function getPrem() {
		var ntriObj = parsObj.rrbx;
		ntriObj["extraParams"] = parsObj.extraParams;

		premAjax(ntriObj, function(value) {
			$("#prem").text(value + "元");

			parsObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars = parsObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}

	// =============================
	// 业务逻辑
	// =============================
};
export default serviceLogic;