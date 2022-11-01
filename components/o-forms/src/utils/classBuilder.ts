export const classBuilder = (base: string, addBaseToClasses: boolean = true ):[Function, Function] => {
	const classes: string[] = [addBaseToClasses ? base : ''];

	const addPropery = (property: string, addSeparator: boolean = true) => {
		classes.push(`${base}${addSeparator ? '--' : ''}${property}`)
	}

	const getClasses = () => {
		return classes.join(' ')
	}
	return [addPropery, getClasses]
}
