import React, {Component} from 'react'

import Introduction from '../components/Introduction'
import Conversation from '../containers/Conversation'

import './forms.css'
import './app.css'

export default class App extends Component {
	render() {
		return (
			<div>
				<Introduction />
				<Conversation delay="4000" />
			</div>
		)
	}
}
