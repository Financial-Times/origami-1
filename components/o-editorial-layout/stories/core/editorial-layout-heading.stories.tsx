import {withDesign} from "storybook-addon-designs";
import withHtml from 'origami-storybook-addon-html';
import {ComponentMeta} from "@storybook/react";
import {EditorialLayoutHeading} from "../../src/tsx/editorial-layout-heading";
import './editorialLayout.scss';

export default {
	title: 'Components/o-editorial-layout',
	component: EditorialLayoutHeading,
	decorators: [withDesign, withHtml],
	args: {
		title: 'What I learnt in my days on the mountain in Davos'
	}
} as ComponentMeta<typeof EditorialLayoutHeading>;

const Template = args => {
	const {title,  ...headingArgs} = args
	return (
		<EditorialLayoutHeading {...headingArgs}>{title}</EditorialLayoutHeading>
	);
};

export const Heading = Template.bind({});
Heading.args = {
	headingLevel: '1'
}
