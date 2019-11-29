import React from 'react'
import PropTypes from 'prop-types'
import {
	Map
} from 'immutable'

export default class Preview extends React.Component {
	static propTypes = {
		value: PropTypes.node,
		entry: PropTypes.node
	}

	static defaultProps = {
		value: Map(),
		entry: Map()
	}

	render() {
		// we can't use this.props.value alone because of a bug in Netlify CMS
		// https://github.com/netlify/netlify-cms/issues/2150
		var fieldName = this.props.field.get('name')
		var value = this.props.value && this.props.value.size ? this.props.value : this.props.entry.get('data').get(fieldName)

		// `value` may be an immutable Map (when first loaded), or a plain object (when updated)
		// if a Map, convert to plain object for display
		if (typeof value.toJS === 'function') {
			value = value.toJS()
		}

		return ( 
			<div dangerouslySetInnerHTML = {
				{
					__html: typeof value === 'object' ? value.html : ''
				}
			}></div>
		);
	}
}
