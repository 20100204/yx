let shopName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let shopData = function() {
        return {
            orderNum: Math.round(Math.random() * 10),
            orderMoney: Math.round(Math.random() * 1000),
            starNum: Math.round(Math.random() * 100),
            profit: Math.round(Math.random() * 1000),
            orderDate: '2018-0' + Math.round(Math.random() * 1 + 5) + '-' + (function() {
                let day = Math.round(Math.random() * 29 + 1) + '';
                if (day.length == 1) {
                    day = '0' + day;
                }
                return day;
            })() + ' ' + (function() {
                let hour = Math.round(Math.random() * 23) + '';
                if (hour.length == 1) {
                    hour = '0' + hour;
                }
                return hour;
            })() + ':' + (function() {
                let minute = Math.round(Math.random() * 59) + '';
                if (minute.length == 1) {
                    minute = '0' + minute;
                }
                return minute;
            })() + ':' + (function() {
                let second = Math.round(Math.random() * 59) + '';
                if (second.length == 1) {
                    second = '0' + second;
                }
                return second;
            })()
        }
    },
    shopDatas = function() {
        let datas = {
            dates: getAllDate(['2018-05-01', '2018-06-30']),
            datas: []
        };
        datas.dates.map((v) => {
            datas.datas.push(shopData());
        });
        return datas;
    },
    getAllDate = function(dataArr) {
        //获取开始日期和结束日期内所有的日期
        let ab = dataArr[0].split("-");
        let ae = dataArr[1].split("-");
        let db = new Date();
        db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
        let de = new Date();
        de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
        let unixDb = db.getTime();
        let unixDe = de.getTime();
        let dateArr = [];
        for (let k = unixDb; k <= unixDe;) {
            dateArr.push(new Date(parseInt(k)).toLocaleDateString());
            k = k + 24 * 60 * 60 * 1000;
        }
        return dateArr;
    };
let creatData = function(lng, lat) {
    let shop = [];
    for (let i = 0; i < Math.round(Math.random() * 20 + 10); i++) {
        shop.push({
            shopName: '店东' + shopName[Math.round(Math.random() * (shopName.length - 1))],
            shopMaster: shopName[Math.round(Math.random() * (shopName.length - 1))] + shopName[Math.round(Math.random() * (shopName.length - 1))] + shopName[Math.round(Math.random() * (shopName.length - 1))],
            shopTel: '18888888888',
            shopAddress: 'xx省xx市xx区',
            shopData: shopData(),
            shopDatas: shopDatas(),
            shopPoint: {
                lng: lng + (Math.random() * 0.4 - 0.2),
                lat: lat + (Math.random() * 0.2 - 0.1)
            }
        })
    }
    return shop;
}
export default [{

        shop: creatData(114.064552, 22.548456)
    },
    {

        shop: creatData(120.366047, 36.057078)
    },
    {

        shop: creatData(113.921815, 35.306703)
    },
    {
        name: '乌鲁木齐',

        shop: creatData(87.633046, 43.826764)
    },
    {
        name: '无锡',

        shop: creatData(120.308959, 31.509986)
    }
];