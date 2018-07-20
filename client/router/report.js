import Reports from '../components/reports/Reports.vue';
import FindReports from '../components/reports/FindReport.vue';
import UserReports from '../components/reports/UserReports.vue';
import Report from '../components/reports/Report.vue';
import NewReport from '../components/reports/NewReport.vue';
import AddReport from '../components/reports/AddReport.vue';

export default {
  path: '/reports',
  component: Reports,
  redirect: '/reports/users',
  children: [{
    path: 'users',
    component: FindReports,
    name: 'findReports'
  }, {
    path: 'new',
    component: AddReport,
    name: 'addReport'
  }, {
    path: 'users/:userId',
    component: UserReports,
    name: 'userReports'
  }, {
    path: 'new/:userId',
    component: NewReport,
    name: 'newReport'
  }, {
    path: 'users/:userId/report/:reportId',
    component: Report,
    name: 'report'
  }]
};
