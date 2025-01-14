'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PickupData } from '@/types/bookings';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radioButton';
import { BookForSomeoneForm } from './BookForSomeone';
import Notes from '../service-class/Notes';
import { PICKUP_INFO_NOTES } from '@/lib/constants';

export function PickupInfo() {
	const [formData, setFormData] = useState<PickupData>({
		bookingFor: 'myself',
		flightNumber: '',
		pickupSign: '',
		notes: '',
		referenceCode: '',
	});

	const handleInputChange = (field: keyof PickupData, value: string | 'myself' | 'someone-else') => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<>
			<div>
				<h2 className="mb-6 text-2xl font-semibold">Select who you are booking for</h2>
				<Card>
					<CardContent className="pt-6">
						<RadioGroup
							value={formData.bookingFor}
							onValueChange={value => handleInputChange('bookingFor', value as 'myself' | 'someone-else')}
							className="space-y-4"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="myself" id="myself" />
								<Label htmlFor="myself">Book for myself</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="someone-else" id="someone-else" />
								<Label htmlFor="someone-else">Book for someone else</Label>
							</div>
						</RadioGroup>
					</CardContent>
				</Card>
			</div>

			{/* Book for someone else */}
			{formData.bookingFor === 'someone-else' && (
				<div className="mt-8">
					<BookForSomeoneForm />
				</div>
			)}

			{/* Additional Information */}
			<div className="mt-8">
				<h2 className="mb-6 text-2xl font-semibold">Provide additional information</h2>
				<Card>
					<CardContent className="space-y-6 pt-6">
						{/* Flight Number */}
						<div className="space-y-2">
							<Label htmlFor="flight-number">Flight number</Label>
							<Input
								id="flight-number"
								className="bg-gray-200"
								placeholder="e.g. LH 202, U24567, BA2490"
								value={formData.flightNumber}
								onChange={e => handleInputChange('flightNumber', e.target.value)}
							/>
							<p className="text-sm text-muted-foreground">
								Enter your flight number to ensure your chauffeur can track your flight and adjust the pickup time.
							</p>
						</div>

						{/* Pickup Sign */}
						<div className="space-y-2">
							<Label htmlFor="pickup-sign">Pickup sign</Label>
							<Input
								id="pickup-sign"
								className="bg-gray-200"
								value={formData.pickupSign}
								onChange={e => handleInputChange('pickupSign', e.target.value)}
							/>
							<p className="text-sm text-muted-foreground">
								It will appear on your chauffeur's pickup sign when they meet you.
							</p>
						</div>

						{/* Notes */}
						<div className="space-y-2">
							<Label htmlFor="notes">Notes for the chauffeur</Label>
							<Textarea
								id="notes"
								value={formData.notes}
								onChange={e => handleInputChange('notes', e.target.value)}
								className="min-h-[100px] resize-none bg-gray-200"
							/>
							<p className="text-sm text-muted-foreground">
								Add special requests, e.g. booking itinerary, number of bags, child seats, etc. Please do not include
								confidential information.
							</p>
						</div>

						{/* Reference Code */}
						<div className="space-y-2">
							<Label htmlFor="reference-code">Reference code or cost center</Label>
							<Input
								id="reference-code"
								className="bg-gray-200"
								value={formData.referenceCode}
								onChange={e => handleInputChange('referenceCode', e.target.value)}
							/>
							<p className="text-sm text-muted-foreground">
								Booking for business? What you enter above will appear on the invoice.
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Book for someone else Notes*/}
				{formData.bookingFor === 'someone-else' && (
					<Card className="mt-8">
						<CardContent className="space-y-6 pt-6">
							<Notes notes={PICKUP_INFO_NOTES} />
						</CardContent>
					</Card>
				)}
			</div>
		</>
	);
}
