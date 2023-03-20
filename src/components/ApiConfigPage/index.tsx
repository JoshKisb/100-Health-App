import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import "../../styles/langConfig.css";
import { observer } from "mobx-react";
import { useStore } from "../../Context";
import {
	Button,
	notification,
	Select,
	Spin,
	Progress,
	Space,
	Card,
	Form,
	Input,
} from "antd";

const ApiConfigPage: FunctionComponent = observer(() => {
	const store = useStore();
	const apiStore = store.apiStore;
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		setLoading(true);
		apiStore.fetchDSValues().then(() => {
			setLoading(false);
			console.log("vals", { ...apiStore.values });
			form.setFieldsValue({ ...apiStore.values });
		});
	}, []);

	const onFinish = (values) => {
		setSubmitting(true);
		console.log("valzzz", values);
		apiStore
			.saveDSValues(values)
			.then(() => {
				notification.success({
					message: "API Settings updated successfully!",
					onClick: () => {},
					duration: 4,
				});
				store.showEvents();
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const valuesChange = () => {};

	return (
		<div className="lang-config-form-container">
			<Form
				form={form}
				name="death-certificate"
				layout="horizontal"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				onFinish={onFinish}
				className="lang-config-form w-100 mb-4"
				scrollToFirstError={true}
				initialValues={apiStore.values}
				onValuesChange={valuesChange}
			>
				<Card
					title="Configure API Settings"
					actions={[
						<Button
							htmlType="submit"
							type="primary"
							disabled={submitting}
							loading={submitting}
						>
							{submitting ? "Saving..." : "Save"}
						</Button>,
					]}
				>
					<Spin spinning={loading}>
						<Space direction="vertical" style={{ width: "100%" }} size={24}>
							<Card type="inner" title="Get NIN Token">
								<Form.Item
									label="Username"
									name="nin_username"
									className=""
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									label="Password"
									name="nin_password"
									className=""
								>
									<Input size="large" />
								</Form.Item>
							</Card>
							<Card type="inner" title="Set NITA Client">
								<Form.Item
									label="Username"
									name="nita_username"
									className=""
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									label="Password"
									name="nita_password"
									className=""
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									label="Base URL"
									name="nita_baseurl"
									className=""
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item label="Token" name="nita_token" className="">
									<Input size="large" />
								</Form.Item>
								<Form.Item label="Method" name="nita_method" className="">
									<Input size="large" />
								</Form.Item>
							</Card>
							<Card type="inner" title="Set Password">
								<Form.Item
									label="Username"
									name="sepa_username"
									className=""
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									label="Password"
									name="sepa_password"
									className=""
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item label="Token" name="sepa_token" className="">
									<Input size="large" />
								</Form.Item>
								<Form.Item label="Method" name="sepa_method" className="">
									<Input size="large" />
								</Form.Item>
							</Card>
						</Space>
					</Spin>
				</Card>
			</Form>
		</div>
	);
});

export default ApiConfigPage;
