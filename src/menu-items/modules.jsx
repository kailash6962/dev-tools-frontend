// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

export const mock = {
  id: 'group-api',
  title: 'API',
  type: 'group',
  children: [
    {
      id: 'mock-server',
      title: 'Mock Server',
      type: 'item',
      url: '/mock-server',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export const project = {
  id: 'project',
  title: 'Project',
  type: 'group',
  children: [
    {
      id: 'project-create',
      title: 'Project Create',
      type: 'item',
      url: '/project-create',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};