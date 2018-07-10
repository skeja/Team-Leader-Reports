import Reports from '../components/reports/Reports.vue';
import FindReports from '../components/reports/FindReport.vue';
import UserReports from '../components/reports/UserReports.vue';
import Report from '../components/reports/Report.vue';
import NewReport from '../components/reports/NewReport.vue';
import AddReport from '../components/reports/AddReport.vue';
import UpdateReport from '../components/reports/UpdateReport.vue';

export default {
  path: '/reports',
  component: Reports,
  children: [{
    path: '',
    component: FindReports
  }, {
    path: 'new',
    component: AddReport
  }, {
    path: ':userId',
    component: UserReports
  }, {
    path: ':userId/newReport',
    component: NewReport
  }, {
    path: ':userId/:reportId',
    name: NewReport,
    component: Report
  }, {
    path: ':userId/:reportId/update',
    component: UpdateReport
  }]
};
