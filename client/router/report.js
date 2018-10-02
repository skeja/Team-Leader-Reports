import index from '../components/reports/index';
import UserReports from '../components/reports/UserReports';
import Report from '../components/reports/Report';
import Create from '../components/reports/Create';
import Add from '../components/reports/Add';

export default [
  {
    path: '/reports/users',
    component: index,
    name: 'findReports'
  }, {
    path: '/reports/new',
    component: Add,
    name: 'addReport'
  }, {
    path: '/reports/users/:userId',
    component: UserReports,
    name: 'userReports'
  }, {
    path: '/reports/new/:userId',
    component: Create,
    name: 'newReport'
  }, {
    path: '/reports/users/:userId/report/:reportId',
    component: Report,
    name: 'report'
  }];
