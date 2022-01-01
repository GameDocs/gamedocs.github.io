import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

function NavActive(path) {
	let hash = window.location.hash;
	// If hash is empty return true if path is empty
	if(!hash) return !path;

	// Remove hash character '#'
	hash = hash.substr(1);
	
	let slashIndex = hash.indexOf('/');
	if(slashIndex >= 0) {
		hash = hash.substring(0, slashIndex);
	}

	return path === hash;
}

function FixNavPath(path) {
	if(path.startsWith('/')) {
		path = path.substr(1);
	}

	return path;
}

function NavItem(props) {
	let path = FixNavPath(props.path);
	let active = NavActive(path);
	
	return (
		<a className={`${styles.Item} ${active ? styles.ActiveItem:''}`}
			href={`/#${path}`}
			onClick={(e) => {
				let elements = document.getElementsByClassName(styles.ActiveItem);
				for(let i = 0; i < elements.length; i++) {
					elements[i].classList.remove(styles.ActiveItem);
				}

				e.target.classList.add(styles.ActiveItem);
			}}>

			{props.name}
		</a>
	);
}

export default NavItem;
