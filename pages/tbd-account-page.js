import { GetEnvNames } from "../services";

import { Button, Div, PanelHeader } from "@vkontakte/vkui";

import _log from '../helpers/log';
import getValuesFromSourceByKeys from "../helpers/getValuesFromSourceByKeys";

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

const TBDAccountPage = () => {
  return (
    <>
      <PanelHeader>Еще Страница</PanelHeader>
      <NonIdealState
        icon="🙂"
        title="Личный кабинет?"
        description="Возможно тут может быть личный кабинет пользователя?"
      />
    </>
  )
}

export default TBDAccountPage