import Vue from 'vue'
import Router from 'vue-router'
import orderdetail from '@/components/orderdetail/orderdetail'
import wash from '@/components/orderdetail/wash'
import repair from '@/components/orderdetail/repair'
import common from '@/components/orderdetail/common'
import babysitter from '@/components/orderdetail/baby-sitter'
import evaluate from '@/components/evaluate/evaluate'
import servicedetail from '@/components/servicedetail/service-detail'
import government from '@/components/government/government-detail'
import systemmessage from '@/components/systemmessage/system-message'
import userprotocal from '@/components/protocal/user-protocal'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/orderdetail/wash'
    }, {
      path: '/orderdetail',
      name: 'orderdetail',
      component: orderdetail,
      children: [,
        /*保姆详情页*/
        {
          path:'babysitter',
          component:babysitter
        },
        /*衣服清洗*/
        {
          path:'wash',
          component:wash
        },
        /*维修页*/
        {
          path:'repair',
          component:repair
        },
        /*公用保洁类*/
        {
          path:'common',
          component:common
        }
      ]
    },
    /*评价页面*/
    {
      path: '/evaluate',
      component: evaluate
    },
    /*服务详情页面*/
    {
      path: '/servicedetail',
      component: servicedetail
    },
    /*政务详情页*/
    {
      path:'/government',
      component:government
    },
    /*系统信息页*/
    {
      path:'/system-message',
      component:systemmessage

    },
    /*用户协议页*/
    {
      path:'/user-protocal',
      component:userprotocal
    }
  ]
})
