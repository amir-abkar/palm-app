import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Fullstack App | Auth',
	description: 'Author: SaJJaD Khorasani - Authentication module',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="container mx-auto w-full h-full flex flex-col justify-center items-center">
					{children}
				</div>
			</body>
		</html>
	);
}
