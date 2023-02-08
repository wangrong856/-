import LayOut from '@/LayOut'

export default {
    path: '/salarys',
    name:'salarys',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/salarys")
            ,
        }
    ],
    meta: {
        name: "工资",
        icon: "money",
    }
}