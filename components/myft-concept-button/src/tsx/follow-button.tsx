export interface FollowButtonProps {
	label: string;
	theme?: 'standard' | 'inverse' | 'opinion' | 'monochrome';
	// an optional csrf element
	csrf?: JSX.Element;
	// for props that aren't appropriate in origami
	extraFormProps: any;
	// for props that aren't appropriate in origami
	extraButtonProps: any;
	conceptName: string;
	followAction: string;
	unfollowAction: string;
	followed: boolean;
}

export default function FollowButton({
	conceptName,
	csrf,
	label,
	theme,
	extraFormProps,
	extraButtonProps,
	followed,
}: FollowButtonProps) {
	let buttonLabel = followed
		? `Remove ${conceptName} from myFT`
		: `Add ${conceptName} to myFT`;

	return (
		<form
			className={`myft-concept-button myft-concept-button--follow ${
				theme ? `myft-concept-button--${theme}` : ''
			}`}
			data-o-component="myft-concept-button"
			data-myft-concept-button-concept={conceptName}
			method="get"
			{...extraFormProps}>
			{csrf || null}
			{
				// TODO o-normalise-visually-hidden
			}
			<div
				className="myft-follow-button__announcement o-normalise-visually-hidden"
				aria-live="assertive"></div>
			<button
				aria-pressed={followed}
				aria-label={buttonLabel}
				title={buttonLabel}
				type="submit"
				className="myft-concept-button__button"
				{...extraButtonProps}>
				{label || conceptName}
			</button>
		</form>
	);
}

export {FollowButton};
