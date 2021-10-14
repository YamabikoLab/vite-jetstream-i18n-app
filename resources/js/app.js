import './bootstrap'

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import '../css/app.css'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async name => {
        if (import.meta.env.DEV) {
            return await import(`./Pages/${name}.vue`)
        } else {
            let pages = import.meta.glob('./Pages/**/*.vue')
            const importPage = pages[`./Pages/${name}.vue`]
            return importPage().then(module)
        }
    },
    setup({ el, app, props, plugin }) {

        const i18n = createI18n({
            legacy: false,
            globalInjection: true,
            locale: _locale,
            messages
        })

        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(i18n)
            .mixin({ methods: { route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
