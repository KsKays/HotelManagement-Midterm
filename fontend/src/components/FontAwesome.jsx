import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

export const HomeIcon = (props) => <FontAwesomeIcon icon={faHome} {...props} />;
export const UserIcon = (props) => <FontAwesomeIcon icon={faUser} {...props} />;
export const PlusIcon = (props) => <FontAwesomeIcon icon={faPlus} {...props} />;
export const FoodIcon = (props) => (
  <FontAwesomeIcon icon={faUtensils} {...props} />
);
