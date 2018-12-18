import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        title: {
            i18n: 'home'
        },
        name: 'home_index',
        component: () =>
            import ('@/views/home/home.vue')
    },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        /*{
        	path: 'order/:order_id',
        	title: '订单详情',
        	name: 'order-info',
        	component: () =>
        		import('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
        	path: 'shopping',
        	title: '购物详情',
        	name: 'shopping',
        	component: () =>
        		import('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {
        	path: 'message',
        	title: '消息中心',
        	name: 'message_index',
        	component: () =>
        		import('@/views/message/message.vue')
        }*/
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/approve',
        icon: 'ios-rose',
        name: 'approve',
        title: '待审批',
        component: Main,
        children: [{
            path: 'approve_index',
            title: '待审批事项',
            display: true,
            name: 'approve_index',
            component: () =>
                import ('@/views/approve/approve_index.vue')
        },
        ]
    }, {
        path: '/goods',
        icon: 'ios-rose',
        name: 'goods',
        title: '产品管理',
        component: Main,
        children: [{
            path: 'index',
            title: '产品库管理',
            display: true,
            name: 'goods_index',
            component: () =>
                import ('@/views/goods/goods-store.vue')
        }, {
            path: 'goodslist',
            icon: 'jet',
            display: true,
            name: 'goodslist',
            title: '产品列表',
            component: () =>
                import ('@/views/goods/goods-list.vue')
        }, {
            path: 'goodsadd',
            icon: 'jet',
            name: 'goodsadd',
            title: '产品添加',
            component: () =>
                import ('@/views/goods/goods-add.vue')
        },
            {
                path: 'goodsedit/:id',
                name: 'goodsedit',
                title: '产品编辑',
                component: () =>
                    import ('@/views/goods/goods-edit.vue')
            }
        ]
    },
    {
        path: '/activity',
        icon: 'ios-rose',
        name: 'activity',
        title: '活动管理',
        component: Main,
        children: [{
            path: 'activity_index',
            display: true,
            title: '预售管理',
            name: 'activity_index',
            component: () =>
                import ('@/views/activity/preorder/index.vue')
        },
            {
                path: 'preorderadd',
                icon: 'jet',
                display: false,
                name: 'preorderadd',
                title: '添加预售',
                component: () =>
                    import ('@/views/activity/preorder/add.vue')
            },
            {
                path: 'preorderedit/:id',
                icon: 'jet',
                display: false,
                name: 'preorderedit',
                title: '编辑预售',
                component: () =>
                    import ('@/views/activity/preorder/edit.vue')
            },
            {
                path: 'groupbuylists',
                display: true,
                title: '团购管理',
                name: 'groupbuylists',
                component: () =>
                    import ('@/views/activity/groupbuy/index.vue')
            }
        ]
    },
    {
        path: '/ordermanager',
        icon: 'ios-rose',
        name: 'ordermanager',
        title: '交易管理',
        component: Main,
        children: [{
            path: 'orderslist',
            title: '订单管理',
            display: true,
            name: 'orderslist',
            component: () =>
                import ('@/views/reportmanager/order/list.vue')

        },
            {
                path: 'shopprofit',
                title: '店东提成',
                display: true,
                name: 'shopprofit',
                component: () =>
                    import ('@/views/reportmanager/shopprofit/list.vue')
            },
            {
                path: 'aftersaleslist',
                title: '退货申请',
                display: true,
                name: 'aftersaleslist',
                component: () =>
                    import ('@/views/aftersales/list.vue')
            },
            {
                path: 'cancelorderlist',
                title: '取消订单申请',
                display: true,
                name: 'cancelorderlist',
                component: () =>
                    import ('@/views/aftersales/ordercancellist.vue')
            },
        ]
    },
    /*{
    	path: '/reportmanager',
    	icon: 'key',
    	name: 'reportmanager',
    	title: '报表',
    	component: Main,
    	children: [
    	   {
    		path: 'shoptichenglist',
    		title: '店东提成',
    		display: false,
    		name: 'shoptichenglist',
    		component: () =>
    			import('@/views/reportmanager/ticheng/list.vue')
    	   }
    	]
    },*/

    {
        path: '/financemanager',
        icon: 'ios-rose',
        name: 'financemanager',
        title: '财务管理',
        component: Main,
        children: [{
            path: 'ordercheck',
            title: '订单审核',
            display: true,
            name: 'ordercheck',
            component: () =>
                import ('@/views/financemanager/ordercheck/list.vue')
        },
            {
                path: 'settlement',
                title: '结算管理',
                name: 'settlement',
                display: true,
                component: () =>
                    import ('@/views/financemanager/settlement/list.vue')
            },
            {
                path: 'settlementnew',
                title: '新结算管理',
                name: 'settlementnew',
                display: true,
                component: () =>
                    import ('@/views/financemanager/settlement/newlist.vue')
            },
            {
                path: 'exceptionorder',
                title: '异常订单',
                name: 'exceptionorder',
                display: true,
                component: () =>
                    import ('@/views/financemanager/exceptionorder/list.vue')
            }, {
                path: 'aftersalesrefund',
                title: '退货退款',
                display: true,
                name: 'aftersalesrefund',
                component: () =>
                    import ('@/views/aftersales/refund.vue')
            }, {
                path: 'cancelorderrefund',
                title: '取消订单退款',
                display: true,
                name: 'cancelorderrefund',
                component: () =>
                    import ('@/views/aftersales/ordercancelrefund.vue')
            }
            /* {
                        	path: 'tixianlist',
                        	title: '提现管理',
                        	name: 'tixianlist',
                        	component: () =>
                        		import('@/views/financemanager/tixian/list.vue')
                        }*/
        ]
    },
    {
        path: '/couponmanager',
        icon: 'ios-rose',
        name: 'couponmanager',
        title: '优惠券',
        component: Main,
        children: [{
            path: 'couponcash',
            title: '现金券',
            display: true,
            name: 'couponcash',
            component: () =>
                import ('@/views/couponmanager/cash/list.vue')
        },
            {
                path: 'couponcashadd',
                title: '添加现金券',
                display: false,
                name: 'couponcashadd',
                component: () =>
                    import ('@/views/couponmanager/cash/add.vue')
            },
            {
                path: 'couponcashedit/:id',
                title: '编辑现金券',
                display: false,
                name: 'couponcashedit',
                component: () =>
                    import ('@/views/couponmanager/cash/edit.vue')
            },
            {
                path: 'coupondiscount',
                title: '满减券',
                display: true,
                name: 'coupondiscount',
                component: () =>
                    import ('@/views/couponmanager/discount/list.vue')
            },
            {
                path: 'coupondiscountadd',
                title: '添加满减券',
                display: false,
                name: 'coupondiscountadd',
                component: () =>
                    import ('@/views/couponmanager/discount/add.vue')
            },
            {
                path: 'coupondiscountedit/:id',
                title: '编辑满减券',
                display: false,
                name: 'coupondiscountedit',
                component: () =>
                    import ('@/views/couponmanager/discount/edit.vue')
            },
            {
                path: 'couponsend',
                title: '送券',
                display: true,
                name: 'couponsend',
                component: () =>
                    import ('@/views/couponmanager/send/list.vue')
            },
            {
                path: 'couponused',
                title: '粉丝用券',
                display: true,
                name: 'couponused',
                component: () =>
                    import ('@/views/couponmanager/send/used.vue')
            }
        ]
    },

    {
        path: '/advertisemanager',
        icon: 'ios-rose',
        name: 'advertisemanager',
        title: '广告管理',
        component: Main,
        children: [{
            path: 'advertise',
            title: '广告管理',
            display: true,
            name: 'advertise',
            component: () =>
                import ('@/views/advertisemanager/advertise/list.vue')
        },
            {
                path: 'advertiseadd',
                title: '广告添加',
                display: false,
                name: 'advertiseadd',
                component: () =>
                    import ('@/views/advertisemanager/advertise/add.vue')
            },
            {
                path: 'advertiseedit/:id',
                title: '广告编辑',
                display: false,
                name: 'advertiseedit',
                component: () =>
                    import ('@/views/advertisemanager/advertise/edit.vue')
            },
            /*{
            	path: 'settlement',
            	title: '广告位',
            	name: 'settlement',
            	display: true,
            	component: () =>
            		import('@/views/financemanager/settlement/list.vue')
            },*/

        ]
    },
    /*{
    	path: '/qianbaomanager',
    	icon: 'key',
    	name: 'qianbaomanager',
    	title: '钱包管理',
    	component: Main,
    	children: [{
    			path: 'diandong',
    			title: ' 店东钱包',
    			name: 'qianbaolist',
    			component: () =>
    				import('@/views/qianbao/diandong/list.vue')
    		},
    		{
    			path: 'companyqianbao',
    			title: '公司钱包',
    			name: 'companyqianbao',
    			component: () =>
    				import('@/views/qianbao/company/list.vue')
    		}
    	]
    },*/
    {
        path: '/usersmanager',
        icon: 'ios-rose',
        name: 'usersmanager',
        title: '用户管理',
        component: Main,
        children: [
            {
                path: 'supplierlist',
                title: '供应商列表',
                name: 'supplierlist',
                display: true,
                component: () =>
                    import ('@/views/users/supplier/list.vue')
            },
            {
                path: 'supplierapplylist',
                title: '供应商申请列表',
                name: 'supplierapplylist',
                display: true,
                component: () =>
                    import ('@/views/users/supplier/apply.vue')
            },
            {
                path: 'supplieradd',
                title: '添加供应商',
                name: 'supplieradd',
                display: false,
                component: () =>
                    import ('@/views/users/supplier/add.vue')
            },
            {
                path: 'supplieredit/:id',
                title: '编辑供应商',
                name: 'supplieredit',
                display: false,
                component: () =>
                    import ('@/views/users/supplier/edit.vue')
            },
            {
                path: 'cityuser',
                title: '市公司用户',
                name: 'cityuser',
                display: true,
                component: () =>
                    import ('@/views/users/cityuser/list.vue')
            },
            {
                path: 'citycmpuseradd',
                title: '添加市公司用户',
                display: false,
                name: 'citycmpuseradd',
                component: () =>
                    import ('@/views/users/cityuser/add.vue')
            },
            {
                path: 'citycmpuseredit/:id',
                title: '编辑市公司用户',
                display: false,
                name: 'citycmpuseredit',
                component: () =>
                    import ('@/views/users/cityuser/edit.vue')
            },
            {
                path: 'shopuser',
                title: '社区列表',
                display: true,
                name: 'shopuser',
                component: () =>
                    import ('@/views/users/shopuser/list.vue')
            },
            {
                path: 'agentapply',
                title: '代理申请',
                display: true,
                name: 'agentapply',
                component: () =>
                    import ('@/views/users/agentapply/list.vue')
            },
            {
                path: 'editshopers/:id',
                title: '编辑店东',
                display: false,
                name: 'editshopers',
                component: () =>
                    import ('@/views/users/shopuser/edit.vue')
            },

            {
                path: 'addshopers',
                title: '添加店东',
                display: false,
                name: 'addshopers',
                component: () =>
                    import ('@/views/users/shopuser/add.vue')
            },
            {
                path: 'guest',
                title: '买家列表',
                display: true,
                name: 'guest',
                component: () =>
                    import ('@/views/users/guest/list.vue')
            },
            {
                path: 'headquarter',
                title: '总公司用户',
                display: true,
                name: 'headquarter',
                component: () =>
                    import ('@/views/users/headquarter/list.vue')
            },
            {
                path: 'headquarteradd',
                title: '添加总公司用户',
                display: false,
                name: 'headquarteradd',
                component: () =>
                    import ('@/views/users/headquarter/add.vue')
            },
            {
                path: 'headquarteredit/:id',
                title: '编辑总公司用户',
                display: false,
                name: 'headquarteredit',
                component: () =>
                    import ('@/views/users/headquarter/edit.vue')
            }
        ]
    },
    {
        path: '/statisanalys',
        icon: 'key',
        name: 'statisanalys',
        title: '统计报表',
        component: Main,
        children: [
            {
                path: 'amountorder',
                title: '日订单统计',
                display: true,
                name: 'amountorder',
                component: () =>
                    import ('@/views/reportmanager/order/amount.vue')
            },
            {
                path: 'shoptrend',
                title: '店东分布',
                display: true,
                name: 'shoptrend',
                component: () =>
                    import ('@/views/reportmanager/shop/index.vue')
            },
            {
                path: 'countorder',
                title: '订单数量',
                display: false,
                name: 'countorder',
                component: () =>
                    import ('@/views/reportmanager/order/count.vue')
            },
            {
                path: 'goodscount',
                title: '商品销量',
                display: false,
                name: 'goodscount',
                component: () =>
                    import ('@/views/reportmanager/order/goodscount.vue')
            },

        ]
    },
    {
        path: '/access',
        icon: 'ios-rose',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            /*{
            				path: 'index',
            				title: '权限管理',
            				display: true,
            				name: 'access_index',
            				component: () =>
            					import('@/views/access/index.vue')
            			}, */
            {
                path: 'role',
                title: '角色管理',
                display: true,
                name: 'role_index',
                component: () =>
                    import ('@/views/access/role.vue')
            },
            {
                path: 'addrole',
                display: false,
                title: '添加角色',
                name: 'roleadd',
                component: () =>
                    import ('@/views/access/add_role.vue')
            },

        ]
    },
    {
        path: '/categorymanager',
        icon: 'iso-rose',
        name: 'categorymanager',
        title: '分类管理',
        component: Main,
        children: [{
            path: 'categoryindex',
            title: '分类管理',
            icon: 'iso-rose',
            display: true,
            name: 'categoryindex',
            component: () =>
                import ('@/views/category/list.vue')
        },
            {
                path: 'addcategory',
                title: '分类添加',
                icon: 'iso-rose',
                display: false,
                name: 'addcategory',
                component: () =>
                    import ('@/views/category/add.vue')
            },


        ]
    },
    {
        path: '/systemset',
        icon: 'iso-rose',
        name: 'systemset',
        title: '系统设置',
        component: Main,
        children: [
            {
            path: 'systemsetindex',
            title: '系统设置',
            icon: 'iso-rose',
            display: true,
            name: 'systemsetindex',
            component: () =>
                import ('@/views/systemset/index.vue')
           }
        ]
    },
    /*{
        path: '/anayls',
        icon: '',
        name: 'anayls',
        title: '统计',
        component: Main,
        children: [

            {
                path: 'anaylsindex',
                title: '统计',
                display: true,
                name: 'anaylsindex',
                component: () =>
                    import ('@/views/anayle/index.vue')
            }

        ]
    },*/

    /*{
    	path: '/access-test',
    	icon: 'lock-combination',
    	title: '权限测试页',
    	name: 'accesstest',
    	access: 0,
    	component: Main,
    	children: [{
    		path: 'index',
    		title: '权限测试页',
    		name: 'accesstest_index',
    		access: 0,
    		component: () =>
    			import('@/views/access/access-test.vue')
    	}]
    }, {
    	path: '/international',
    	icon: 'earth',
    	title: {
    		i18n: 'international'
    	},
    	name: 'international',
    	component: Main,
    	children: [{
    		path: 'index',
    		title: {
    			i18n: 'international'
    		},
    		name: 'international_index',
    		component: () =>
    			import('@/views/international/international.vue')
    	}]
    }, {
    	path: '/component',
    	icon: 'social-buffer',
    	name: 'component',
    	title: '组件',
    	component: Main,
    	children: [{
    			path: 'text-editor',
    			icon: 'compose',
    			name: 'text-editor',
    			title: '富文本编辑器',
    			component: () =>
    				import('@/views/my-components/text-editor/text-editor.vue')
    		},
    		{
    			path: 'md-editor',
    			icon: 'pound',
    			name: 'md-editor',
    			title: 'Markdown编辑器',
    			component: () =>
    				import('@/views/my-components/markdown-editor/markdown-editor.vue')
    		},
    		{
    			path: 'image-editor',
    			icon: 'crop',
    			name: 'image-editor',
    			title: '图片预览编辑',
    			component: () =>
    				import('@/views/my-components/image-editor/image-editor.vue')
    		},
    		{
    			path: 'draggable-list',
    			icon: 'arrow-move',
    			name: 'draggable-list',
    			title: '可拖拽列表',
    			component: () =>
    				import('@/views/my-components/draggable-list/draggable-list.vue')
    		},
    		{
    			path: 'area-linkage',
    			icon: 'ios-more',
    			name: 'area-linkage',
    			title: '城市级联',
    			component: () =>
    				import('@/views/my-components/area-linkage/area-linkage.vue')
    		},
    		{
    			path: 'file-upload',
    			icon: 'android-upload',
    			name: 'file-upload',
    			title: '文件上传',
    			component: () =>
    				import('@/views/my-components/file-upload/file-upload.vue')
    		},
    		{
    			path: 'count-to',
    			icon: 'arrow-graph-up-right',
    			name: 'count-to',
    			title: '数字渐变',
    			// component: () => import('@/views/my-components/count-to/count-to.vue')
    			component: () =>
    				import('@/views/my-components/count-to/count-to.vue')
    		},
    		{
    			path: 'split-pane-page',
    			icon: 'ios-pause',
    			name: 'split-pane-page',
    			title: 'split-pane',
    			component: () =>
    				import('@/views/my-components/split-pane/split-pane-page.vue')
    		}
    	]
    }, {
    	path: '/form',
    	icon: 'android-checkbox',
    	name: 'form',
    	title: '表单编辑',
    	component: Main,
    	children: [{
    			path: 'artical-publish',
    			title: '文章发布',
    			name: 'artical-publish',
    			icon: 'compose',
    			component: () =>
    				import('@/views/form/article-publish/article-publish.vue')
    		},
    		{
    			path: 'workflow',
    			title: '工作流',
    			name: 'workflow',
    			icon: 'arrow-swap',
    			component: () =>
    				import('@/views/form/work-flow/work-flow.vue')
    		}

    	]
    },*/
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    /*	{
    		path: '/tables',
    		icon: 'ios-grid-view',
    		name: 'tables',
    		title: '表格',
    		component: Main,
    		children: [{
    				path: 'dragableTable',
    				title: '可拖拽排序',
    				name: 'dragable-table',
    				icon: 'arrow-move',
    				component: () =>
    					import('@/views/tables/dragable-table.vue')
    			},
    			{
    				path: 'editableTable',
    				title: '可编辑表格',
    				name: 'editable-table',
    				icon: 'edit',
    				component: () =>
    					import('@/views/tables/editable-table.vue')
    			},
    			{
    				path: 'searchableTable',
    				title: '可搜索表格',
    				name: 'searchable-table',
    				icon: 'search',
    				component: () =>
    					import('@/views/tables/searchable-table.vue')
    			},
    			{
    				path: 'exportableTable',
    				title: '表格导出数据',
    				name: 'exportable-table',
    				icon: 'code-download',
    				component: () =>
    					import('@/views/tables/exportable-table.vue')
    			},
    			{
    				path: 'table2image',
    				title: '表格转图片',
    				name: 'table-to-image',
    				icon: 'images',
    				component: () =>
    					import('@/views/tables/table-to-image.vue')
    			}
    		]
    	}, {
    		path: '/advanced-router',
    		icon: 'ios-infinite',
    		name: 'advanced-router',
    		title: '高级路由',
    		component: Main,
    		children: [{
    				path: 'mutative-router',
    				title: '动态路由',
    				name: 'mutative-router',
    				icon: 'link',
    				component: () =>
    					import('@/views/advanced-router/mutative-router.vue')
    			},
    			{
    				path: 'argument-page',
    				title: '带参页面',
    				name: 'argument-page',
    				icon: 'android-send',
    				component: () =>
    					import('@/views/advanced-router/argument-page.vue')
    			}
    		]
    	}, {
    		path: '/error-page',
    		icon: 'android-sad',
    		title: '错误页面',
    		name: 'errorpage',
    		component: Main,
    		children: [{
    			path: 'index',
    			title: '错误页面',
    			name: 'errorpage_index',
    			component: () =>
    				import('@/views/error-page/error-page.vue')
    		}]
    	}*/
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
