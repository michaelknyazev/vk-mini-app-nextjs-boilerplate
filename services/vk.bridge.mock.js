import bridgeMock from '@vkontakte/vk-bridge-mock';

export const VKWebAppInit = () => bridgeMock.send('VKWebAppInit');
export const VKWebAppGetLaunchParams = () => new Promise((resolve) => {
  resolve({
    "vk_access_token_settings": "",
    "vk_app_id": 8154561,
    "vk_are_notifications_enabled": "0",
    "vk_is_app_user": 0,
    "vk_is_favorite": 0,
    "vk_language": "ru",
    "vk_platform": "desktop_web",
    "vk_ref": "other",
    "vk_ts": 1651437160,
    "vk_user_id": 5352943,
    "sign": "dTdsE3CQJBL3rmT28pB9_UV252FxYFLSyuk4NiZqLvg"
});
});

export const VKWebAppGetUserInfo = () => bridgeMock.send('VKWebAppGetUserInfo')