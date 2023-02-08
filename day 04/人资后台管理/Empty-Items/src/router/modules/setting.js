import LayOut from '@/LayOut'

export default {
    path: '/settings',
    name:'settings',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/settings")
            , 
        }
    ],
    meta: {
        name: "公司设置",
        icon: "setting",
    }
}