import LayOut from '@/LayOut'

export default {
    path: '/permissions',
    name: 'permissions',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/permissions")
            , 
        }
    ],
    meta: {
        name: "权限管理",
        icon: "lock",
    }
}