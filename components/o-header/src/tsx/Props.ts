export type HeaderProps = {
	top?: {
		hasMyFT: boolean;
	};
	nav?: Nav;
	search?: boolean;
	anon?: boolean;
	sticky?: boolean;
	simple?: boolean;
	transparent?: boolean;
	megamenu?: boolean;
	drawer?: Drawer;
	subnav?: boolean;
	currentNav?: CurrentNav;
	type: 'primary' | 'megamenu' | 'subnav';
};

// General Types
export type AnchorType = {
	name: string;
	href: string;
};

// NAV types
export type Nav = {
	mobile: NavItem[];
	desktop: NavDesktopItem[];
	isSignedIn: boolean;
};

export type NavItem = {
	name: string;
	url: string;
	index: number;
	selected?: boolean;
}

export interface NavDesktopItem extends NavItem {
	hasMega?: boolean;
	articles?: Article[];
	subsections?: Subsection[];
}

export type Article = {
	title: string;
	url: string;
};

export type Subsection = {
	name: string;
	url: string;
};



// Drawer types
type Drawer = {
	nav: DrawerNav[];
	editions: {
		current: EditionType;
		others: EditionType[];
	};
	user: User;
};

type DrawerNav = {
	heading?: {
		name: string;
	};
	items: DrawerNavItem[];
};

type EditionType = {
	name: string;
	id: string;
};

type DrawerNavItem = {
	name: string;
	href: string;
	index: number;
	selected?: boolean;
	hasChildren?: boolean;
	children?: AnchorType[];
	variation?: string;
	divider?: boolean;
};

type User = {
	isSignedIn: boolean;
	name: string;
};

// CUrrent NAV types
export type CurrentNav = {
	name: string;
	href?: string;
	children: AnchorType[];
	selected?: boolean;
	childrenRight?: AnchorType[];
	ancestors?: AnchorType[];
};
