let shopName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let shopData = function() {
	return {
		orderNum: Math.round(Math.random() * 10),
		orderMoney: Math.round(Math.random() * 1000),
		starNum: Math.round(Math.random() * 100),
		profit: Math.round(Math.random() * 1000),
		orderDate: '2018/' + Math.round(Math.random() * 11 + 1) + '/' + Math.round(Math.random() * 29 + 1)
	}
}
let creatData = function(lng, lat) {
	let shop = [];
	for(let i = 0; i < Math.round(Math.random() * 20 + 10); i++) {
		shop.push({
			shopName: '店东' + shopName[Math.round(Math.random() * (shopName.length - 1))],
			shopMaster: shopName[Math.round(Math.random() * (shopName.length - 1))] + shopName[Math.round(Math.random() * (shopName.length - 1))] + shopName[Math.round(Math.random() * (shopName.length - 1))],
			shopTel: '18888888888',
			shopAddress: 'xx省xx市xx区',
			shopData: shopData(),
			shopPoint: {
				lng: lng + (Math.random() * 0.4 - 0.2),
				lat: lat + (Math.random() * 0.2 - 0.1)
			}
		})
	}
	return shop;
}
export default [{
		name: '深圳',
		value: [{
				name: '店东数量',
				value: Math.round(Math.random() * 20 + 10)
			},
			{
				name: '订单数量',
				value: Math.round(Math.random() * 90 + 10)
			},
			{
				name: '订单金额',
				value: Math.round(Math.random() * 9000 + 1000)
			},
			{
				name: '粉丝数量',
				value: Math.round(Math.random() * 900 + 100)
			},
			{
				name: '分润',
				value: Math.round(Math.random() * 9000 + 1000)
			}
		],
		point: {
			lng: 114.064552,
			lat: 22.548456
		},
		shop: creatData(114.064552, 22.548456)
	},
	{
		name: '青岛',
		value: [{
			name: '店东数量',
			value: Math.round(Math.random() * 20 + 10)
		}, {
			name: '订单数量',
			value: Math.round(Math.random() * 90 + 10)
		}, {
			name: '订单金额',
			value: Math.round(Math.random() * 9000 + 1000)
		}, {
			name: '粉丝数量',
			value: Math.round(Math.random() * 900 + 100)
		}, {
			name: '分润',
			value: Math.round(Math.random() * 9000 + 1000)
		}],
		point: {
			lng: 120.366047,
			lat: 36.057078
		},
		shop: creatData(120.366047, 36.057078)
	},
	{
		name: '新乡',
		value: [{
			name: '店东数量',
			value: Math.round(Math.random() * 20 + 10)
		}, {
			name: '订单数量',
			value: Math.round(Math.random() * 90 + 10)
		}, {
			name: '订单金额',
			value: Math.round(Math.random() * 9000 + 1000)
		}, {
			name: '粉丝数量',
			value: Math.round(Math.random() * 900 + 100)
		}, {
			name: '分润',
			value: Math.round(Math.random() * 9000 + 1000)
		}],
		point: {
			lng: 113.921815,
			lat: 35.306703
		},
		shop: creatData(113.921815, 35.306703)
	},
	{
		name: '乌鲁木齐',
		value: [{
			name: '店东数量',
			value: Math.round(Math.random() * 20 + 10)
		}, {
			name: '订单数量',
			value: Math.round(Math.random() * 90 + 10)
		}, {
			name: '订单金额',
			value: Math.round(Math.random() * 9000 + 1000)
		}, {
			name: '粉丝数量',
			value: Math.round(Math.random() * 900 + 100)
		}, {
			name: '分润',
			value: Math.round(Math.random() * 9000 + 1000)
		}],
		point: {
			lng: 87.633046,
			lat: 43.826764
		},
		shop: creatData(87.633046, 43.826764)
	},
	{
		name: '无锡',
		value: [{
			name: '店东数量',
			value: Math.round(Math.random() * 20 + 10)
		}, {
			name: '订单数量',
			value: Math.round(Math.random() * 90 + 10)
		}, {
			name: '订单金额',
			value: Math.round(Math.random() * 900 + 100)
		}, {
			name: '粉丝数量',
			value: Math.round(Math.random() * 900 + 100)
		}, {
			name: '分润',
			value: Math.round(Math.random() * 9000 + 1000)
		}],
		point: {
			lng: 120.307859,
			lat: 31.509986
		},
		shop: creatData(120.308959, 31.509986)
	}
];