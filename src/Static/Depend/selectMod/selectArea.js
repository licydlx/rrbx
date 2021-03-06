// 下拉:选择省市地区
// 参数:
// 例子:
// 作者:ydlx
// 日期:2018-03-14
class selectArea {
	constructor(bindDom, title, data, func) {
		this.bindDom = bindDom;
		this.title = title;
		this.data = data;
		this.func = func;
	}

	init() {
		var that = this;

		that.bindDom.on("click", function(event) {
			event.preventDefault();
			var codeStr = that.bindDom.attr("data-id"),
				oneLevelId = "",
				twoLevelId = "",
				threeLevelId = "";
			if (codeStr) {
				var codeArray = codeStr.split(",");
				oneLevelId = codeArray[0];
				twoLevelId = codeArray[1];
				threeLevelId = codeArray[2];
			};

			new IosSelect(3, [that.data.provinces, that.data.citys, that.data.countys], {
				title: that.title,
				itemHeight: 35,
				relation: [1, 1],
				oneLevelId: oneLevelId,
				twoLevelId: twoLevelId,
				threeLevelId: threeLevelId,
				showAnimate: true,
				callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
					if (that.func) {
						that.func({
							selectOneObj,
							selectTwoObj,
							selectThreeObj
						});
					};
					that.bindDom.attr("data-id", selectOneObj.id + "," + selectTwoObj.id + "," + selectThreeObj.id);
					that.bindDom.attr("value", selectOneObj.value + "," + selectTwoObj.value + "," + selectThreeObj.value);
				}
			});
		});
	}
}
export default selectArea;