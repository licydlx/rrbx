//共同样式
require("../Static/scss/reset/reset.scss");
require("../Static/scss/common/common.scss");
// 模板渲染

import ntri_item from '../Moudle/ntri/ntri_item.js';
import ntri_footer from '../Moudle/ntri/ntri_footer.js';

const brickObj = {
	'ntri_footer': ntri_footer,
	'ntri_item': ntri_item
}

var tTrial = function(obj, brick, callback) {
	document.getElementById("container").innerHTML =
		brick.map((value, index, array) => array[index] =
			brickObj[value]).reduce((prev, next, index) => {
			if (index == 1) {
				prev = prev(obj);
			};
			return `${prev}${next(obj)}`;
		});
	if (callback) {
		callback();
	};

};
export default tTrial;