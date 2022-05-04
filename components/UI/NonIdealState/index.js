import styles from './NonIdealState.module.scss';
import { Placeholder } from "@vkontakte/vkui";

const NonIdealState = ({ icon, title, description, children }) => {
  return (
    <Placeholder
      icon={icon}
      header={title}
    >
      {(() => {
        if (description) return <span className={styles.text}>{description}</span>
      })()}
      {children}
    </Placeholder>
  )
}

export default NonIdealState;