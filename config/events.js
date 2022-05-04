import { Icon24Info, Icon16ErrorCircleFill, Icon24CheckCircleOutline, Icon24WarningTriangleOutline } from '@vkontakte/icons';
/*
  VK Colors:

    --yellow: #ffc107;
    --red_nice: #ff3347;
    --blue_bright: #5c9ce6;
    --green_nice: #3dcc4b;
*/

// Test
export const TEST_INFO = { event: 'TEST_INFO', message: 'TEST_MESSAGE_PRIMARY', before: <Icon24Info color='5181b8' /> };
export const TEST_SUCCESS = { event: 'TEST_SUCCESS', message: 'TEST_MESSAGE_SUCCESS', before: <Icon24CheckCircleOutline color="3dcc4b" /> };
export const TEST_WARNING = { event: 'TEST_WARNING', message: 'TEST_MESSAGE_WARNING', before: <Icon24WarningTriangleOutline color="ffc107" /> };
export const TEST_DANGER = { event: 'TEST_DANGER', message: 'TEST_MESSAGE_DANGER', before: <Icon16ErrorCircleFill color="ff3347" /> };

// Server messages
export const SERVER_ERROR = { event: 'SERVER_ERROR', message: 'SERVER_ERROR' };
export const SERVER_SUCCESS = { event: 'SERVER_SUCCESS', message: 'SERVER_SUCCES', icon: 'tick' }
export const HOST_UNREACHABLE = { event: "HOST_UNREACHABLE", message: "HOST_UNREACHABLE", icon: "offline" }
