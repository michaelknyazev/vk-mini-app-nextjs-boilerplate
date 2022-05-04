import { Icon56ErrorTriangleOutline } from "@vkontakte/icons"
import { Group, Header, Panel, PanelHeader, Placeholder, SplitCol, SplitLayout, useAdaptivity, ViewWidth } from "@vkontakte/vkui"

const ErrorMessage = ({ title, message }) => {
  const { viewWidth } = useAdaptivity();

  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
        <Panel id="error">
          <PanelHeader>Error</PanelHeader>
          <Group header={<Header mode="secondary">{title}</Header>}>
            <Placeholder
              icon={<Icon56ErrorTriangleOutline />}
              header={message}
            />
          </Group>
        </Panel>
      </SplitCol>
    </SplitLayout>


  )
}

export default ErrorMessage;