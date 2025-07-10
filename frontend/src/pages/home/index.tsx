import Layout from 'components/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { authUserSelector } from 'store/modules/auth/selectors';

const HomePage: React.FC = () => {
	const user = useSelector(authUserSelector);
	
	return (
		<Layout title='Success'>
			<div className='success-container'>
				<h2>Welcome, {user.username}!</h2>
				<p>Your account has been created successfully.</p>
				<div className='user-info'>
					<p><strong>Email:</strong>{user.email}</p>
					<p><strong>username:</strong>{user.username}</p>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
