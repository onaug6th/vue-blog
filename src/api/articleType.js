import httpClient from '../providers/httpClient';
import superHttp from '../providers/superHttp';

/**
 * 获取文章分类列表
 */
function articleTypeList() {
    return superHttp({
        url: 'articleType/list',
        method: 'post',
        data : {}
    })
}

export { articleTypeList }