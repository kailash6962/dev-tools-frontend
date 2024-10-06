import { 
    PlusSquareOutlined,
    MoreOutlined,
    SlackOutlined,
    CloudServerOutlined,
    CloseOutlined,
    LeftOutlined } from '@ant-design/icons';

export const AddIcon = () => {
    return (<PlusSquareOutlined />)
}
export const MoreActionIcon = () => {
    return (<MoreOutlined style={{ fontSize: '24px', color: '#08c' }}/>)
}
export const BackBtnIcon = () => {
    return (<LeftOutlined style={{ fontSize: '20px', color: '#08c' }}/>)
}
export const ProjectIcon = () => {
    return (<SlackOutlined style={{ fontSize: '20px', color: '#08c' }}/>)
}
export const MockServerIcon = () => {
    return (<CloudServerOutlined style={{ fontSize: '20px', color: '#08c' }}/>)
}
export const CloseIcon = () => {
    return (<CloseOutlined style={{ fontSize: '20px', color: '#08c' }}/>)
}
