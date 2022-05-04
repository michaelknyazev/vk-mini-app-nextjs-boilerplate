import bridge from '@vkontakte/vk-bridge';

export const VKWebAppInit = () => bridge.send('VKWebAppInit');
export const VKWebAppGetLaunchParams = () => bridge.send('VKWebAppGetLaunchParams')
export const VKWebAppGetUserInfo = () => bridge.send('VKWebAppGetUserInfo')

