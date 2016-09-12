import oComponentBoilerplate from './src/js/componentBoilerplate';

const constructAll = function() {
	oComponentBoilerplate.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof window !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}
export default oComponentBoilerplate;
