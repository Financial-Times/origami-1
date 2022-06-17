import {IconName} from './data';

export interface IconProps {
	icon: IconName;
}

export function Icon({icon}: IconProps): JSX.Element {
	return <span className={`o-icons-icon o-icons-icon--${icon}`}></span>;
}