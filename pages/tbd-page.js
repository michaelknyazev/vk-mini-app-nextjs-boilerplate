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

const TBDPage = () => {
  return (
    <>
      <PanelHeader>Страница</PanelHeader>
      <NonIdealState
        icon="🙃"
        title="Общий лейаут"
        description="Внизу менюшка, с двумя страницами и одной всплывающей модалкой."
      />
    </>
  )
}

export default TBDPage