import React from 'react';
import styles from './Navbar.module.scss';

function Navbar(props) {
	return (
		<div className={`${styles.Navbar}`}>
			{props.children}
		</div>
	);
}

export default Navbar;
