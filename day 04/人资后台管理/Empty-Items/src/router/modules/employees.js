import LayOut from '@/LayOut'

export default {
    path: '/employees',
    name: 'employees',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/employees")


        }
    ]
    , meta: {
        name: "员工",
        icon: "people",
    }
}


