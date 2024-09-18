// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

export const project = {
  id: 'project',
  title: 'Master',
  type: 'group',
  children: [
    {
      id: 'project-list',
      title: 'Projects',
      type: 'item',
      url: '/project-list',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    }
  ]
};

export const mock = {
  id: 'group-api',
  title: 'API-Tools',
  type: 'group',
  children: [
    {
      id: 'mock-server',
      title: 'Mock Server',
      type: 'item',
      url: '/mock-server',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    }
  ]
};
