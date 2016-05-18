import React, { Component } from 'react'
import {reduxForm} from 'redux-form'
import {FormDecorator} from './FormDecorator'
import ReactSelect from 'react-select'
import SelectOption from './SelectOption.js'
import 'react-select/dist/react-select.css'
import './Select.css'


class ReactSelectWrapper extends Component {
	render() {
		let {
			value, onBlur, onChange, submit,
			options,
			onChangeAndSubmit =
				(value, [ option ]) => {
					// TODO we're using a small hack (the step's resume is an object)
					// until we store more redux form fields
					option.text = option['Taux net'] + ' %'
					onChange(option)
					submit(option)
				},
				selectValue = value && value['Code risque'],
				// but ReactSelect obviously needs a unique identifier
			} = this.props

		if (!options) return null

		return (
			<ReactSelect
					options={options}
					onChange={onChangeAndSubmit}
					labelKey="Nature du risque"
					valueKey="Code risque"
					placeholder="Choisissez une catégorie"
					optionRenderer={SelectOption}
					valueRenderer={(value) => value['Nature du risque'].substring(0, 50) + '...'}

					comment="See https://github.com/erikras/redux-form/issues/82#issuecomment-143164199"
					value={selectValue}
					onBlur={() => onBlur(value)}
			/>
		)
	}
}

@FormDecorator
class Select extends Component {
	state = {
		options: null,
	}

	render() {
		let {
			fields: {resume: choice},
			handleSubmit,
			actions: {submitStep},
			formName,
			submit = handleSubmit(() => submitStep(formName)),
		} = this.props
		return (
			<div className="select-answer">
				<ReactSelectWrapper {...choice} options={this.state.options}  submit={submit} />
			</div>

		)
	}

	componentDidMount() {
		fetch(this.props.optionsURL)
				.then(response => {
					if (!response.ok) {
						let error = new Error(response.statusText)
						error.response = response
						throw error
					}
					return response.json()
				})
				.then(json => this.setState({options: json}))
				.catch(console.log('Oups !!'))
	}

}

export default reduxForm()(Select)
