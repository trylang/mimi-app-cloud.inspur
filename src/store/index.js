import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        /** 用户认证状态
         * +  未登录 notauth
         * +  华北 cn-north
         * +  华北二 cn-north-2
         * +  华北三 cn-north-3
         */
        userAuthStatus: 'notauth',
        userAuthInfo: null,
        tokenParsed: null,
        refreshToken: null,
        isIphoneX:false,
        bannerList:[]
    },
    mutations: {
        changeUserAuthStatus(state, status) {
            state.userAuthStatus = status
        },
        updateUserAuthInfo(state, info) {
            state.userAuthInfo = info
        },
        setTokenParsed(state, token) {
            state.tokenParsed = token
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
        },
        ISIPHONEX(state, status) {
          state.isIphoneX = status;
        },
        SETBANNERLIST(state, list) {
          state.bannerList = list;
        },
    },
    actions: {
        isIphoneX(context,status) {
          context.commit("ISIPHONEX",status);
        },
        setBannerList(context,list) {
          context.commit("SETBANNERLIST",list);
        },
    },
    getters: {
        /** 用户信息 */
        getUserInfo: state => {
            let userName = null;
            let userId = null;
            if (state.tokenParsed && state.tokenParsed.preferred_username && state.tokenParsed.sub) {
                userName = state.tokenParsed.preferred_username,
                    userId = state.tokenParsed.sub
            }
            return {
                userName,
                userId
            };
        }
    }
})

export default store
