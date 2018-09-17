import http from '../providers/httpClient';

/**
 * 获取文章分类列表
 */
function articleTypeList() {
    return http({
        url: 'articleType/list',
        method: 'post',
        data : {}
    })
}

export { articleTypeList }