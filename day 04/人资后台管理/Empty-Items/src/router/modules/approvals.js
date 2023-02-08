import LayOut from '@/LayOut'

export default {
    path: '/approvals',
    name: 'approvals',
    component: LayOut,
    children: [
        {
            path: '', component: () => import("@/views/approvals"),

        }
    ],
    meta: {
        name: "审批",
        icon: "tree-table",
    }
}