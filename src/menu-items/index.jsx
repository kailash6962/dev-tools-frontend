// project import
import dashboard from './dashboard';
import {project,mock} from './modules';
import pages from './page';
import utilities from './utilities';
import support from './support';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    mock,
    project,
    dashboard, 
    pages, 
    utilities, 
    support
  ]
};

export default menuItems;
