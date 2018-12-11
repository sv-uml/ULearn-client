import "./login.css";
import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faQuestion, faChartBar, faSync } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "../../services/user";
import { AuthState } from "../../misc/Auth";
import { setState } from "../../misc/AppActions";

library.add(faDesktop);
library.add(faQuestion);
library.add(faChartBar);
library.add(faSync);

interface loginProps { login(args: AuthState): void, history?: { push(path: string): any } };
interface loginState { email: string, password: string, login_pending: boolean };

class LoginComponent extends React.Component<loginProps, loginState> {
    constructor(props: any) {
        super(props);
        this.state = { email: "", password: "", login_pending: false };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ login_pending: true });

        UserService.login(this.state.email, this.state.password).then((data) => {
            if (data.status !== 200) {
                alert("An error occurred while authenticating the user.");
                return;
            }
            this.props.login({
                loggedIn: true,
                name: data.data.name,
                email: data.data.email,
                token: data.data.token
            });
            this.setState({ login_pending: false });
            this.props.history.push("/");
        });
    }

    render() {
        return <section className="container auth">
            <div className="login-form">
                <Link to="/" className="login-header-item">ULearn</Link>
                <div className="login-form-container">
                    <h2>Sign In</h2>
                    <span>Please enter your email and password to continue.</span>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <div className="form-element">
                            <span>Email:</span>
                            <input type="text" ref="login-email" placeholder="Email (name@domain.com)" onChange={e => this.setState({email: e.target.value})} />
                        </div>
                        <div className="form-element">
                            <span>Password:</span>
                            <input type="password" className="login-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                        </div>
                        <input type="submit" value="Sign In" disabled={this.state.login_pending} />
                    </form>
                    {
                        this.state.login_pending &&
                        <span className="auth-status-pending">
                            <FontAwesomeIcon icon="sync" spin={true} size="1x" />
                        </span>
                    }
                    <span className="auth-switch">Don't have an account? <Link to="/register">Register</Link></span>
                </div>
            </div>
            <div className="login-banner">
                <div className="login-banner-infographic">
                    <h2>Workforce training made easy.</h2>
                    <div className="diagram">
                        <div className="diagram-item">
                            <span className="diagram-icon"><FontAwesomeIcon icon="desktop" /></span>
                            <span className="diagram-text">Create courses to train your team</span>
                        </div>
                        <div className="diagram-item">
                            <span className="diagram-icon"><FontAwesomeIcon icon="question" /></span>
                            <span className="diagram-text">Assess each participant's understanding</span>
                        </div>
                        <div className="diagram-item">
                            <span className="diagram-icon"><FontAwesomeIcon icon="chart-bar" /></span>
                            <span className="diagram-text">Analyze effectiveness of the course</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (args: AuthState) => {
            dispatch(setState(args))
        }
    }
};

export const Login = connect(null, mapDispatchToProps)(withRouter(LoginComponent));
