import styled from "styled-components";
import { Modal } from "antd";

export const BrandModal = styled(Modal)`
	/* border-radius: 16px; */
	/* box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); */

	&& .ant-modal-header {
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	&& .ant-modal-footer {
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
	}
`;
