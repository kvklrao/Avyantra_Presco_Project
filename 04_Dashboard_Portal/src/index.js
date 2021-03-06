import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Dashboard from './dashboard/Dashboard';
import MainComponent from '../src/Main/MainComponent'
import HospitalDashboard from './dashboard/SepsisGraph/hospitalDashboard';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import AllBabyDetails from '../src/dashboard/BabyDetails/AllBabyDetails'
import GenderDistributionGraph from './dashboard/GenderDistribution/GenderDistributionGraph';
import PreTermGraph from './dashboard/Pre-Term/PreTermGraph';
import TypeOfDeliveryGraph from './dashboard/TypeOfDelivery/TypeOfDeliveryGraph';
import EosLosGraph from './dashboard/EOS_LOSGraph/EosLosGraph';
import Settings from './Main/settings';
import FinalDiagnosisGraph from './dashboard/FinalDiagnosis/FinalDiagnosisGraph';
import ReadingVsSepsisScoreGraph from './dashboard/ReadingVsSepsisScore/ReadingVsSepsisScoreGraph';
import CRPVsBloodCultureGraph from './dashboard/CRPVsBloodCultureVsPredictiveAnalysis/CRPVsBloodCultureGraph';

function requireAuth(nextState, replaceState) {
  if (localStorage.getItem('token') == null)
    replaceState({ nextPathname: nextState.location.pathname }, '/')
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("primary_user")==1 ? (
        <Settings {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);


ReactDOM.render(
  <Router history={browserHistory}>
    <switch>
      <Route exact path="/" component={App} />
      <Route exact path="/dashboard" component={MainComponent} onEnter={requireAuth}>
        <PrivateRoute exact path="/settings" component={Settings} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/sepsis" component={HospitalDashboard}></Route>
        <Route path="/baby_details" component={AllBabyDetails} />
        <Route path="/gender_check" component={GenderDistributionGraph} />
        <Route path="/pre_term_check" component={PreTermGraph} />
        <Route path="/type_of_delivery" component={TypeOfDeliveryGraph} />
        <Route path="/eos_los" component={EosLosGraph} />
        <Route path="/final_diagnosis" component={FinalDiagnosisGraph} />
        <Route path="/reading_sepsis_score" component={ReadingVsSepsisScoreGraph} />
        <Route path="/crp_blood_culture" component={CRPVsBloodCultureGraph} />
      </Route>

      {/* <Redirect from="/" /> */}
    </switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
