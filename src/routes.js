import menu from '@/data/menu'

export default menu.map(item => {
    !!item.children && item.children.map(c => {
        c.component = require(`@/views${c.path.split("?")[0]}`);
        return c;
    })
    return item;
});