import LayOut from '@/LayOut'

export default {
    path: '/social_securitys',
    name: 'social_securitys',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/social_securitys")
            , 
        }
    ],
    meta: {
        name: "社保",
        icon: "table",
    }
}