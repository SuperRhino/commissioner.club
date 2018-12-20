import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

const Responsive = createContext();
const Provider = Responsive.Provider;

/*
	* Wraps a component to use Context to check responsiveness
	*
	* @returns {Object}
*/
export class ResponsiveProvider extends Component {
	state = {
		isMobile: false,
		isTablet: false,
		isDesktop: true,
	}

	getBodyWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

	minWidth = value => this.getBodyWidth() >= value

	maxWidth = value => this.getBodyWidth() <= value

	isBetween = (min, max) => this.minWidth(min) && this.maxWidth(max)

	debouncer = null;

	debounce = () => {
		const DEBOUNCE_RATE = this.props.debounceRate || 100;
		if (this.debouncer) clearTimeout(this.debouncer);
		this.debouncer = setTimeout(this.handleResize, DEBOUNCE_RATE);
	}

	handleResize = () => {
		const isMobile = this.maxWidth(767);
		const isTablet = this.isBetween(768, 991);
		const isDesktop = this.minWidth(992);

		if (isMobile !== this.state.isMobile) {
			this.setState({ isMobile, isTablet, isDesktop });
		}

		if (isTablet !== this.state.isTablet) {
			this.setState({ isMobile, isTablet, isDesktop });
		}

		if (isDesktop !== this.state.isDesktop) {
			this.setState({ isMobile, isTablet, isDesktop });
		}
	}

	componentDidMount () {
		this.handleResize();
		window.addEventListener('resize', this.debounce);
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.debounce);
	}

	render () {
		return (
			<Provider value={this.state}>
				{this.props.children}
			</Provider>
		);
	}
}

ResponsiveProvider.propTypes = {
	children: PropTypes.node,
	debounceRate: PropTypes.number,
};

/*
	* Provide children down the tree with a way to check responsiveness
	* @param {Function} ReactStateless - Takes our state from above as params
*/
export const ResponsiveCheck = Responsive.Consumer;
