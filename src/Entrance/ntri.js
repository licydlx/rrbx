import env from '../Config/env.js';
import tTrial from '../Template/ntri.js';
// js事件绑定
import e_ntri_premTrial from '../Static/js/ntri/ntri_premTrial.js';
import e_ntri_footer from '../Static/js/ntri/ntri_footer.js';
// 动态导入相关产品的文件
const productConfig = require('../Config/config.json');

const pageConfig = require("../Config/Page/" + productConfig.productId + "/ntri.json");
const serviceLogic = require("../Config/Page/" + productConfig.productId + "/ntri/serviceLogic.js").default;

const eventFuc = {
	"e_ntri_premTrial": e_ntri_premTrial,
	"e_ntri_footer": e_ntri_footer
}

class lifeCycle {
	constructor() {}
		// 页面初始化
	init() {
			// that: 当前作用域对象
			// renderData: 页面渲染数据 (后台返回数据加json配置数据)
			// brickArray: 页面模板组成
			var rrbxSet = JSON.parse(localStorage.getItem(productConfig.productId)),
				[that, renderData, brickArray] =
				[this, Object.assign(pageConfig.renderData, rrbxSet.renderDate), pageConfig.htmlBrick];
				
			new Promise(function(resolve, reject) {
				tTrial(renderData, brickArray);
				resolve([renderData,rrbxSet]);
			}).then(function(a) {
				that.bindEvent(a[0]);
				return a;
			}).then(function(a) {
				that.serviceLogic(a);
			}).catch(function(err) {
				console.log("试算页流程 work wrong");
			}).then(function() {
				console.log("work done");
			})
		}
		// 页面事件绑定
	bindEvent(data) {
			var BE = pageConfig.bindEvent;
			for (let func in BE) {
				var pars = BE[func]["pars"] ? BE[func]["pars"] : null;
				if (pars && pars["data"]) pars["data"] = data;
				if (eventFuc[func]) eventFuc[func](pars);
			};
		}
		// 页面业务逻辑
	serviceLogic(data) {
		if (serviceLogic) {
			serviceLogic(data);
		};
	}
};

var launch = new lifeCycle();
launch.init();