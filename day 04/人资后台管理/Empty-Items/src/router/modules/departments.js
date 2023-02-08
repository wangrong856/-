import LayOut from '@/LayOut'

export default {
    path: '/departments',
    name: 'departments',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/departments")
            
        }
    ]
    , meta: {
        name: "组织架构",
        icon: "tree",
    }
}