'use client';

import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

interface IProductCardProps {
	product: Prisma.ProductGetPayload<true>;
}

export const ProductCard = ({ product }: IProductCardProps) => {
	const router = useRouter();

	const onEditHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push(`/product/${product.id}`);
	};

	return (
		<Card className="w-96">
			<CardHeader shadow={false} floated={false} className="h-96">
				<Image
					className="w-full h-full object-cover"
					width={150}
					height={180}
					alt={product.name}
					src={product?.image || '/default-product'}
				/>
			</CardHeader>
			<CardBody>
				<div className="flex items-center justify-between mb-2">
					<Typography color="blue-gray" className="font-medium">
						{product.name}
					</Typography>
					<Typography color="blue-gray" className="font-medium">
						${product.price.toFixed(2)}
					</Typography>
				</div>
				<Typography variant="small" color="gray" className="font-normal opacity-75">
					{product.description}
				</Typography>
			</CardBody>
			<CardFooter className="pt-0">
				<Button
					ripple={false}
					fullWidth={true}
					className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
					onClick={onEditHandler}
				>
					Edit
				</Button>
			</CardFooter>
		</Card>
	);
};