import { Button, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderClose, SplitCol, SplitLayout, Tabbar, TabbarItem } from "@vkontakte/vkui"
import { Icon20Square4Outline, Icon20CommentOutline, Icon24BillheadOutline } from '@vkontakte/icons';
import { useRouter } from 'next/router';
import { useState } from "react";
import NonIdealState from "../UI/NonIdealState";

const DefaultGlobalLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
      <SplitLayout
        modal={
          <ModalRoot activeModal={isModalOpen ? 'Modal-wrapper' : null} onClose={handleCloseModal}>
            <ModalPage 
              settlingHeight={100} 
              id='Modal-wrapper' 
              header={
                <ModalPageHeader right={<PanelHeaderClose onClick={handleCloseModal}>Закрыть</PanelHeaderClose>}>Modal</ModalPageHeader>
              }
            >
              <NonIdealState
                icon="🤩"
                title="Тадааам"
                description="Можно отредачить в /components/layouts/DefaultGlobalLayout. Но вообще я вынес бы это в отдельный компонент - контейнер."
              >
                <Button size="l" stretched onClick={handleCloseModal}>Закрыть</Button>
              </NonIdealState>
            </ModalPage>
          </ModalRoot>
        }
      >
        <SplitCol>
          {children}
        </SplitCol>
        <Tabbar>
        <TabbarItem
          onClick={() => {
            handleCloseModal();
            router.push('/tbd-page')
          }}
          selected={!isModalOpen && router.pathname.search('tbd-page') >= 0}
          text="Page"
        >
          <Icon20Square4Outline />
        </TabbarItem>
        <TabbarItem
          onClick={() => handleToggleModal()}
          selected={isModalOpen}
          text="Modal"
        >
          <Icon20CommentOutline />
        </TabbarItem>
        <TabbarItem
          onClick={() => {
            handleCloseModal();
            router.push('/tbd-account-page')
          }}
          selected={!isModalOpen && router.pathname.search('tbd-account') >= 0}
          text="Account"
        >
          <Icon24BillheadOutline />
        </TabbarItem>
      </Tabbar>
      </SplitLayout>
  );
}

export default DefaultGlobalLayout