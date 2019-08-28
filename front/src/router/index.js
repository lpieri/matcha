import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import profile from '@/pages/profile'
import history from '@/pages/history'
import resetPassword from '@/pages/resetPassword'
import confirmeEmail from '@/pages/confirmeEmail'
import search from '@/pages/search'
import blockUsers from "@/pages/blockUsers"
import chat from "@/pages/chat"
import generatorPage from '@/pages/generatorPage'
import notifsMobile from "@/pages/notifsMobile";
Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		name: 'index',
		component: index
		},
    {
      path: '/profile/:username?',
      name: 'profile',
      component: profile
	  },
	  {
		  path: '/history',
		  name: 'history',
		  component: history
    },
    {
      path: '/reset-password/:token?',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/confirme-email/:token?',
      name: 'confirmeEmail',
      component: confirmeEmail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/block-users/:username?',
      name: 'blockUsers',
      component: blockUsers,
      props: {byMe: false}
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/generator/:counter/:country?',
      name: 'generator',
      component: generatorPage
    },
    {
      path: '/notifs-mobile/',
      name: 'notifsMobile',
      component: notifsMobile
    }
  ],
});
