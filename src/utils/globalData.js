// globalData用来存放全局的数据
let globalData = localStorage

// 获取全局的数据
// 传入key,获取对应的全部值
// 不传入key，返回全部值
export function getGlobalData(key) {
    return key ? globalData.getItem(key) : globalData;
}

//设置全局数据
export function setGlobalData(key, value) {
    // 传入键值对
    if (key === undefined || value === undefined) {
        return;
    }
    globalData.setItem(key, value)
    return globalData;
}

// 清除全局数据
export function clearGlobalData(key) {
    if (key === undefined) {
        globalData.clear()
    } else {
        globalData.removeItem(key)
    }
    return globalData;
}