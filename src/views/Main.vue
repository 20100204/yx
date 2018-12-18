<style lang="less">
	@import "./main.less";
</style>
<template>
	<div class="main" :class="{'main-hide-text': shrink}">
		<div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
			<shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
				<div slot="top" class="logo-con">
					<img v-show="!shrink" src="../images/logo.png" key="max-logo" />
					<img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
				</div>

			</shrinkable-menu>
		</div>
		<div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
			<div class="main-header">
				<div class="navicon-con">
					<Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
				</div>
				<div class="header-middle-con">
					<div class="main-breadcrumb">
						<breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
					</div>
				</div>
				<div class="header-avator-con">
					<full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
					<theme-switch></theme-switch>
					<!-- <lock-screen></lock-screen>
                    <message-tip v-model="mesCount"></message-tip> -->

					<div class="user-dropdown-menu-con">
						<Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
							<Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
								<a href="javascript:void(0)">
									<span class="main-user-name">{{ userName }}</span>
									<Icon type="arrow-down-b"></Icon>
								</a>
								<DropdownMenu slot="list">
									<DropdownItem name="ownSpace">个人中心</DropdownItem>
									<DropdownItem name="loginout" divided>退出登录</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
						</Row>
					</div>
				</div>
			</div>
			<div class="tags-con">
				<tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
			</div>
		</div>
		<div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
			<div class="single-page">
				<keep-alive :include="cachePage">
					<router-view></router-view>
				</keep-alive>
			</div>
		</div>
	</div>
</template>
<script>
	import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
	import tagsPageOpened from './main-components/tags-page-opened.vue';
	import breadcrumbNav from './main-components/breadcrumb-nav.vue';
	import fullScreen from './main-components/fullscreen.vue';
	import lockScreen from './main-components/lockscreen/lockscreen.vue';
	import messageTip from './main-components/message-tip.vue';
	import themeSwitch from './main-components/theme-switch/theme-switch.vue';
	import Cookies from 'js-cookie';
	import util from '@/libs/util.js';


	export default {
		components: {
			shrinkableMenu,
			tagsPageOpened,
			breadcrumbNav,
			fullScreen,
			lockScreen,
			messageTip,
			themeSwitch
		},
		data() {
			return {
				username: '',
				shrink: false,
				userName: '',
				isFullScreen: false,
				openedSubmenuArr: this.$store.state.app.openedSubmenuArr
			};
		},
		computed: {
			menuList() {
				return this.$store.state.app.menuList;
			},
			pageTagsList() {
				return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
			},
			currentPath() {
				return this.$store.state.app.currentPath; // 当前面包屑数组
			},
			avatorPath() {
				return localStorage.avatorImgPath;
			},
			cachePage() {
				return this.$store.state.app.cachePage;
			},
			lang() {
				return this.$store.state.app.lang;
			},
			menuTheme() {
				return this.$store.state.app.menuTheme;
			},
			mesCount() {
				return this.$store.state.app.messageCount;
			}
		},
		methods: {
			init() {
				let pathArr = util.setCurrentPath(this, this.$route.name);
				//this.$store.commit('updateMenulist');
				this.$store.commit('setMenuList');
				this.$store.commit('setMenuList');
				if(pathArr.length >= 2) {
					this.$store.commit('addOpenSubmenu', pathArr[1].name);
				}
				this.userName = Cookies.get('user');
				let messageCount = 3;
				this.messageCount = messageCount.toString();
				this.checkTag(this.$route.name);
				//this.$store.commit('setMessageCount', 3);
			},
			toggleClick() {
				this.shrink = !this.shrink;
			},
			handleClickUserDropdown(name) {
				if(name === 'ownSpace') {
					util.openNewPage(this, 'ownspace_index');
					this.$router.push({
						name: 'ownspace_index'
					});
				} else if(name === 'loginout') {
					// 退出登录
					sessionStorage.clear();
					localStorage.clear();
					Cookies.set('auth', "");
					Cookies.set('PHPSESSID', "");
					Cookies.remove('user');
					this.$http.get('login/out').then((res) => {
						if(res.data.rs == 'true') {
							this.$store.commit('logout', this);
							this.$store.commit('clearMenuList');
							this.$store.commit('clearAllTags');
							this.$store.commit('clearOpenedSubmenu');
							this.$router.push({
								name: 'login'
							});
						}
					}).catch((err) => {
						console.log();
					});

				}
			},
			checkTag(name) {
				let openpageHasTag = this.pageTagsList.some(item => {
					if(item.name === name) {
						return true;
					}
				});
				if(!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
					util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
				}
			},
			handleSubmenuChange(val) {
				// console.log(val)
			},
			beforePush(name) {
				// if (name === 'accesstest_index') {
				//     return false;
				// } else {
				//     return true;
				// }
				return true;
			},
			fullscreenChange(isFullScreen) {
				// console.log(isFullScreen);
			}
		},
		watch: {
			'$route' (to) {
				this.$store.commit('setCurrentPageName', to.name);
				let pathArr = util.setCurrentPath(this, to.name);
				if(pathArr.length > 2) {
					this.$store.commit('addOpenSubmenu', pathArr[1].name);
				}
				this.checkTag(to.name);
				localStorage.currentPageName = to.name;
			},
			lang() {
				util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
			}
		},
		   beforeUpdate(){
            var avatar=document.querySelector('.user-dropdown-menu-con .ivu-avatar');
            var btntext=document.querySelector(".navicon-con .ivu-btn-text")
            var mainheader=document.querySelector(".main-header-con")
            var sidebar=document.querySelector(".sidebar-menu-con");
            var pagecon=document.querySelector('.single-page-con');
            var ivusubmenu=document.querySelectorAll('.ivu-menu-submenu-title');
            var ivumenu=document.querySelector('.ivu-menu');
             var oul=document.querySelectorAll('.ivu-menu-item')
             var odiv=document.querySelector('.ivu-shrinkable-menu');
            var result = window.matchMedia('(max-width: 500px)');
           if (result.matches) {
                avatar.style.height="25px";
               avatar.style.width="25px";
               mainheader.style.paddingLeft="0px";
               pagecon.style.left="0px";
            odiv.style.width="100px";
            sidebar.style.width="100px";
            btntext.style.padding="6px 0px"

           for(var i=0;i<oul.length;i++){
               oul[i].style.padding="12px 7px"
                oul[i].style.fontSize="9px"
           }
             for(var i=0;i<ivusubmenu.length;i++){
            ivusubmenu[i].style.padding="12px 7px"
            ivusubmenu[i].style.fontSize="9px"
           }
        }
        },
		mounted() {
			this.init();
		},
		created() {
			// 显示打开的页面的列表
			this.$store.commit('setOpenedList');
		}
	};
</script>
