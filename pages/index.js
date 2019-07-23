import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import useScript from '../hooks/useScript'

const paypalURL = 'https://www.paypal.com/sdk/js?client-id=sb'

const index = () => {
	const [ loaded, error ] = useScript(paypalURL)
	let PayPalButton
	// let paypal

	if (loaded) {
		// paypal = window.paypal
		PayPalButton = paypal && paypal.Buttons.driver('react', { React, ReactDOM })
	}

	return (
		<div>
			{loaded && (
				<PayPalButton
					style={{
						size: 'medium', // tiny, small, medium
						color: 'black', // orange, blue, silver
						shape: 'rect' // pill, rect
					}}
					createOrder={(data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: '0.01'
									}
								}
							]
						})
					}}
					onApprove={(data, actions) => {
						// Capture the funds from the transaction
						return actions.order.capture().then(function(details) {
							// Show a success message to your buyer
							alert('Transaction completed by ' + details.payer.name.given_name)
						})
					}}
				/>
			)}
		</div>
	)
}

export default index
