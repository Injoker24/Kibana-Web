import React, {
	useState
} from 'react';

import {
	Button,
	Form
} from 'react-bootstrap';
import { AccountActivationService } from 'services';

import {
	PageWrapper,
	PageHeader,
	PageBody,
	PageActions,
	Loader
} from 'shared/components';
import RiplayContent from './riplay-content';

type OnboardingProps = {
	merchantName: string;
	phoneNumber: string;
	companyCode: string;
	onNext: () => void,
	onError: (data: {
		isFatalError: boolean,
		content: string,
		onClose?: Function
	}) => void,
};

const Onboarding: React.FC<OnboardingProps> =
	({
		merchantName,
		phoneNumber,
		companyCode,
		onNext,
		onError
	}) => {
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isAgree, setIsAgree] = useState<boolean>(false);
		const [isRead, SetIsRead] = useState<boolean>(false);

		const handleSubmitUser = async () => {
			try {
				setIsLoading(true);

				await AccountActivationService.submitTncAgreement({
					company_code: companyCode,
					phone_number: phoneNumber
				});

				setIsLoading(false);

				onNext();
			} catch (error) {
				setIsLoading(false);

				const {
					data: { error_schema }
				} = error;

				onError({
					isFatalError: false,
					content: error_schema.message
				});
			}
		};

		return (<>
			{isLoading && <Loader type="absolute" />}
			<PageWrapper>
				<PageHeader title="Aktivasi" />
				<PageBody className="py-0 overflow-hidden d-flex flex-column">
					<div className="mb-4">
						<h5>Aktivasi Sakuku di</h5>
						<h3 className="font-weight-bold mb-3">{merchantName}</h3>
					</div>

					{/* <div className="mb-5">
						<p>Sakuku adalah uang elektronik berbasis server dari BCA yang menggunakan nomor telepon seluler (ponsel) sebagai nomor rekening.</p>
						<p>Dapatkan kemudahan &amp; kenyamanan bertransaksi menggunakan Sakuku.</p>
					</div> */}

					<div className="text-justify overflow-auto mb-3">
						<RiplayContent></RiplayContent>
					</div>

				</PageBody>
				<PageActions>
					<Form.Group>
						<Form.Check
							id="isRead"
							name="isRead"
							custom
							type="checkbox"
							label={<>
								Saya telah membaca, memahami, dan menyetujui Informasi di atas.
							</>}
							checked={isRead}
							onChange={(e: any) => SetIsRead(e.target.checked)}
						/>
						<Form.Check
							id="isAgree"
							name="isAgree"
							custom
							type="checkbox"
							label={<>
								Saya menyetujui&nbsp;<a href="https://www.bca.co.id/syarat-dan-ketentuan/sakuku" target="_blank" rel="noopener noreferrer">Ketentuan Sakuku</a>&nbsp;yang berlaku.
							</>}
							checked={isAgree}
							onChange={(e: any) => setIsAgree(e.target.checked)}
						/>
					</Form.Group>
					<Button type="button"
						block={true}
						variant="primary"
						onClick={handleSubmitUser}
						disabled={isAgree === false || isRead === false}>
						AKTIVASI SEKARANG
					</Button>
				</PageActions>
			</PageWrapper>
		</>);

	};

export default Onboarding;