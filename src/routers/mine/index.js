export default {
    path: '/mine/:viewname',
    component: () => import('@/views/Mine'),
    children: [
        {
            path: 'register',
            component: () => import('@/components/Register')
        },
    ]
}