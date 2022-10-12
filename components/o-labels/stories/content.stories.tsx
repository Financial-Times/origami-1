
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {Content} from '../src/tsx/label';
import './labels.scss';

const brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const ComponentDescription = {
	title: 'Components/o-labels',
	component: Content,
    includeStories: (brand === 'core' ? /.*/ : []),
	argTypes: {
		state: { defaultValue: 'content-premium' },
		size: {
			options: ['small', 'default', 'big'],
			defaultValue: 'default'
		},
		text: {
			name: 'text',
			type: { name: 'string', required: false },
			control: {
			  type: 'text'
			}
		  }
	},
	decorators: [withDesign, withHtml]
};

export default ComponentDescription;

export const ContentLabel = args => {
	const copy = args.text || args.state.replace('content-', '');
	if(args.size === 'default') {
		delete args.size;
	}
	return <Content {...args}>{copy}</Content>;
}
