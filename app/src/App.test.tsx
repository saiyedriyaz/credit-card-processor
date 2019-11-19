import * as React from 'react';
import './App.css';
import {Link, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import Create from './components/customer/Create';


class App extends React.Component<RouteComponentProps<any>> {
    public render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={'/'}> Home </Link>
                        </li>

                        <li>
                            <Link to={'/create'}> Create Customer </Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path={'/create'} exact component={Create}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);