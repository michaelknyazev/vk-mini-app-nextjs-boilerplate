import { useRouter } from "next/router";
import { Button, PanelHeader } from "@vkontakte/vkui";

import { GetEnvNames } from "../services";

import _log from '../helpers/log';
import getValuesFromSourceByKeys from "../helpers/getValuesFromSourceByKeys";

import OnBoardingGlobalLayout from '../components/features/Onboarding/layouts/GlobalLayout';

import NonIdealState from '../components/UI/NonIdealState';

export async function getServerSideProps({ req }) {
  return {
    props: {
      __signCheckFailed: !!req.__signCheckFailed,
      __AppMode: process.env.MODE,
      __ApiRoutes: getValuesFromSourceByKeys(GetEnvNames(), process.env)
    }
  }
}

const OnBoardingPage = () => {
  const router = useRouter();
  return (
    <>
      <PanelHeader>Онбординг</PanelHeader>
      <NonIdealState
        icon="🙃"
        title="Все работает!"
        description="Поздравляю! Теперь можно просто делать мини-апп."
      >
        <Button size="l" stretched onClick={() => router.push('/tbd-page')}>Еще одна страница</Button>
      </NonIdealState>
    </>
  )
}

OnBoardingPage.GlobalLayout = OnBoardingGlobalLayout;

export default OnBoardingPage