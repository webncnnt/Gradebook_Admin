import { Link } from 'react-router-dom';
import svg404 from '../../assets/404.svg';
import Button from '../../components/Button';

const NotFoundPage = () => (
	<div className="flex flex-col items-center justify-center w-full h-full">
		<div aria-label="image404" className="mt-10 md:w-96 w-72">
			<img src={svg404} alt="404" className="w-full h-full" />
		</div>
		<div className="mt-5 text-xl">Trang bạn tìm kiếm không khả dụng</div>
		<Link to="/">
			<Button className="px-4 py-3 mt-3">Quay lại trang chủ</Button>
		</Link>
	</div>
);

export default NotFoundPage;
