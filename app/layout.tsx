import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/navbar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{/* Fixed Navbar */}
				<Navbar />
				{/* Scrollable Content */}
				<div className="h-[calc(100vh-64px)] overflow-y-auto mt-8">{children}</div>
			</body>
		</html>
	);
}
