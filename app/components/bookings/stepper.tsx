'use client';

import Link from 'next/link';
import { StepperProps } from '@/types/bookings';

export function Stepper({ steps }: StepperProps) {
	return (
		<div className="w-full py-4 md:py-6 px-2 md:px-0">
			<div className="relative flex justify-between">
				{/* Line connecting the steps */}
				<div className="absolute top-[11px] left-[6%] right-[6%] h-[3px] bg-gray-200" aria-hidden="true" />

				{/* Steps */}
				{steps.map((step, index) => (
					<div key={index} className="relative flex flex-col items-center group">
						{/* Circle */}
						<div
							className={`w-[22px] h-[22px] rounded-full z-10 border-[2px] 
                ${
									step.status === 'current'
										? 'border-black bg-white'
										: step.status === 'completed'
										? 'border-green-600 bg-green-100'
										: 'border-gray-200 bg-gray-100'
								}`}
						/>

						{/* Label - Link */}
						<Link
							href={step.link}
							className={`hidden md:block mt-2 text-sm rounded-full px-3 py-1 whitespace-nowrap transition-all duration-300 ease-in-out
                ${
									step.status === 'current'
										? ' bg-gray-200 text-black font-medium hover:bg-white hover:text-gray-400'
										: 'text-gray-400 pointer-events-none'
								}`}
						>
							{step.label}
						</Link>

						{/* Mobile Tooltip */}
						<Link
							href={step.link}
							className={`absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 
                md:hidden opacity-0 group-hover:opacity-100 transition-opacity
                bg-gray-900 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap
                ${step.status === 'current' ? 'block' : 'hidden'}`}
						>
							{step.label}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}