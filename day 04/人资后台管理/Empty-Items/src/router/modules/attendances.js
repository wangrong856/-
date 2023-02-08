import LayOut from '@/LayOut'

export default {
    path: '/attendances',
    name:'attendances',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/attendances")
            
        }
    ]
    , meta: {
        name: "考勤",
        icon: "excel",
    }
}