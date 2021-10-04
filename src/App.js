import './App.css';
import {store} from './store';
import {Provider} from 'react-redux';
import {MainPage} from './components/MainPage/MainPage';
import {EditServicePage} from './components/EditServicePage/EditServicePage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Redirect} from 'react-router';

function App() {
    return (
        <Provider store={store}>
            <Router basename={'ra-11.1'}>
                <div className="App">
                    <Switch>
                        <Route exact={true} path={'/services'} component={MainPage}/>
                        <Route path={'/services/edit/:id'} component={(props) => <EditServicePage {...props}/>}/>
                        <Redirect to={'/services'}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
